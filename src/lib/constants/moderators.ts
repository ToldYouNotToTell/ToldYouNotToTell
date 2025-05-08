// src/lib/constants/moderators.ts
export const MODERATOR_ADDRESSES = [
	"0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Пример реального адреса
	"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", // Другой пример
  ];
  
  export const isModerator = (address: string | null): boolean => {
	return address ? MODERATOR_ADDRESSES.includes(address) : false;
  };