'use client';

import { usePosts } from '@/hooks/usePosts';
import { formatDate } from '@/lib/utils/date';
import { escapeHtml } from '@/lib/utils/moderate';
import CommentSection from './comments/CommentSection';

export default function PostCard({ post }) {
  const { 
    ratePost, 
    reportPost, 
    sharePostDirect, 
    copyPostLink, 
    downloadPostImage 
  } = usePosts();

  const isAuthor = false; // Заменить на реальную проверку
  const hasVoted = false; // Заменить на реальную проверку
  const timeLeft = null; // Заменить на реальный расчет

  return (
    <div className="post" data-id={post.id}>
      {isAuthor && (
        <div className="post-actions">
          <button onClick={() => editPost(post.id)} title="Edit">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={() => deletePost(post.id)} title="Delete">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
      
      <div className="post-number">#{post.orderNumber}</div>
      
      {isAuthor && timeLeft && (
        <div className="edit-timer" title="Time left to edit">
          <i className="fas fa-hourglass-half"></i>
          {timeLeft.hours}h {timeLeft.minutes}m
        </div>
      )}
      
      <h3>{escapeHtml(post.title)}</h3>
      <p>{escapeHtml(post.content)}</p>
      
      {post.category && (
        <span className="category-tag">{post.category}</span>
      )}
      
      <div className="post-date">{formatDate(post.date)}</div>
      
      <button className="report-button" onClick={() => reportPost(post.id)} title="Report post">
        <i className="fas fa-flag"></i>
      </button>
      
      <div className="rating-container">
        <i 
          className={`star ${hasVoted ? 'active' : ''}`} 
          onClick={(e) => ratePost(post.id, e)}
        >
          ★
        </i>
        <span className="star-counter">{post.voters?.length || 0}</span>
      </div>
      
      <div className="share-icons">
        <i className="fab fa-x-twitter" title="Share on X" onClick={() => sharePostDirect('twitter', post.id)}></i>
        <i className="fab fa-facebook" title="Share on Facebook" onClick={() => sharePostDirect('facebook', post.id)}></i>
        <i className="fab fa-telegram" title="Share on Telegram" onClick={() => sharePostDirect('telegram', post.id)}></i>
        <i className="fab fa-whatsapp" title="Share on WhatsApp" onClick={() => sharePostDirect('whatsapp', post.id)}></i>
        <i className="fas fa-link" title="Copy link" onClick={() => copyPostLink(post.id)}></i>
        <i className="fas fa-download" title="Download image" onClick={() => downloadPostImage(post.id)}></i>
      </div>
      
      <CommentSection postId={post.id} comments={post.comments || []} />
    </div>
  );
}