// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "hardhat/console.sol";

contract Lock {
    // contract address (mumbai network)
    address NFT_ADDRESS = 0x344Af4979eB0Cbcc52217C1668A7a41db494B31c;

    uint256 lastTimeStamp;
    // 実行間隔
    uint256 interval;

    event GetNftName(string name);

    /**
     * コンストラクター
     */
    constructor(uint256 _interval) {
        interval = _interval;
        console.log("deploy success!!");
    }

    /**
     * getNftName function from other NFT Contract
     */
    function getNftName() public view returns (string memory) {
        IERC721Metadata nft = IERC721Metadata(NFT_ADDRESS);
        console.log("nft Name:", nft.name());

        return nft.name();
    }

    /**
     * 定められた実行間隔のタイミングになったかチェックするためのメソッド
     */
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    /**
     * 定められた実行間隔のタイミングになったらコントラクトのメソッドを実行するメソッド
     * このサンプルでは intervalごとにgrowFlowerメソッドを呼び出してトークンURIの内容を変えるといったもの
     */
    function performUpkeep(bytes calldata /* performData */) external {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            // 呼び出したい処理をここに書く
            // 今回の場合であれば growFlowerメソッドを呼び出す。
            string memory name = getNftName();

            emit GetNftName(name);
        }
    }
}
