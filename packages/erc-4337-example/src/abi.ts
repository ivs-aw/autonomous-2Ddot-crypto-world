export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const ERC721_ABI = [
  // Read-Only Functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",

  // Authenticated Functions
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) returns (bool)",
  "function safeTransferFrom(address from, address to, uint256 tokenId) returns (bool)",
  "function transferFrom(address from, address to, uint256 tokenId) returns (bool)",
  "function approve(address to, uint256 tokenId) returns (bool)",
  "function setApprovalForAll(address operator, bool approved) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)"
];
