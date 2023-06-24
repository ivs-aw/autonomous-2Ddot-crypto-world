// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}