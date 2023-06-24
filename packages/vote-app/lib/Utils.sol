// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Utils {
  // Helper function to convert address to string
  function addressToString(address _address) internal pure returns(string memory) {
    bytes32 _bytes = bytes32(uint256(uint160(_address)));
    bytes memory HEX = "0123456789abcdef";
    bytes memory _string = new bytes(42);
    _string[0] = '0';
    _string[1] = 'x';
    for(uint i = 0; i < 20; i++) {
      _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
      _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
    }
    return string(_string);
  }

}