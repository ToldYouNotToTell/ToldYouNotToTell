const functions = require('firebase-functions');
const admin = require('firebase-admin');
const solanaWeb3 = require('@solana/web3.js');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();
const connection = new solanaWeb3.Connection(process.env.SOLANA_RPC_URL);

// 1. Scheduled Functions
exports.processBoostDecay = functions.pubsub
  .schedule('every 60 minutes')
  .timeZone('UTC')
  .onRun(async (context) => {
    const boostedPosts = await db.collection('posts')
      .where('boost.weight', '>', 0)
      .get();

    const batch = db.batch();
    boostedPosts.forEach(doc => {
      const post = doc.data();
      const decayRate = getDecayRate(post.boost.tier);
      const newWeight = post.boost.weight * (1 - decayRate);
      
      batch.update(doc.ref, {
        'boost.weight': newWeight > 0.1 ? newWeight : 0,
        'boost.lastUpdated': admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    return null;
  });

exports.distributeDailyRewards = functions.pubsub
  .schedule('0 0 * * *') // Daily at midnight UTC
  .timeZone('UTC')
  .onRun(async (context) => {
    const poolDoc = await db.doc('rewards/pool').get();
    const poolAmount = poolDoc.data()?.amount || 0;
    const rewardPerPost = (poolAmount * 0.5) / 10; // 50% to top 10 posts

    const topPosts = await db.collection('posts')
      .where('createdAt', '>', new Date(Date.now() - 86400000)) // Last 24h
      .orderBy('stars', 'desc')
      .limit(10)
      .get();

    const batch = db.batch();
    topPosts.forEach(doc => {
      const post = doc.data();
      if (post.authorWallet) {
        batch.update(doc.ref, { 
          reward: admin.firestore.FieldValue.increment(rewardPerPost) 
        });
        
        batch.set(db.collection('transactions').doc(), {
          type: 'daily_reward',
          amount: rewardPerPost,
          recipient: post.authorWallet,
          postId: doc.id,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    });

    // Update pool (50% rewards, 20% burn, 10% team, 15% staking, 5% treasury)
    batch.update(db.doc('rewards/pool'), { 
      amount: poolAmount * 0.25, // Remaining after distributions
      lastDistributed: admin.firestore.FieldValue.serverTimestamp()
    });

    await batch.commit();
    return null;
  });

exports.calculateStakingRewards = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('UTC')
  .onRun(async (context) => {
    const [stakers, poolDoc] = await Promise.all([
      db.collection('staking').get(),
      db.doc('rewards/staking').get()
    ]);

    const totalRewards = poolDoc.data()?.amount || 0;
    const totalStaked = stakers.docs.reduce((sum, doc) => sum + doc.data().amount, 0);

    const batch = db.batch();
    stakers.forEach(doc => {
      const staker = doc.data();
      const reward = totalRewards * (staker.amount / totalStaked);
      
      batch.update(doc.ref, {
        reward: admin.firestore.FieldValue.increment(reward),
        lastReward: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    return null;
  });

// Helper functions
function getDecayRate(tier) {
  const rates = { 5: 0.30, 10: 0.25, 30: 0.15, 50: 0.10, 100: 0.05, 250: 0.02 };
  return rates[tier] || 0.30;
}