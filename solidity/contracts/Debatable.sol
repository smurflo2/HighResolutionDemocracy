// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// The idea: Anything can be debateable
//   If it's debateable then there can be multiple positions on the subject
//   The goal here is to display the overall stance/feeling/consensus about the subject


// e.g. Subject: "The Earth is flat" is Debatable
//   position 1: true
//      To be figured out: how to determine the the text that represents an entire position
//        could be 
//   position 2: false


// this is meant to be an interface, not implemented


contract Debatable {
    // state variables
    /*
        - positions (y/n, for/against/good but needs modifications, life changing/this is fake)
        - each position can have arguments for or against it
        - each argument is itself debateable - recursion!
    */

    // Sub position on a topic
    //   is this needed?
    struct Argument {

    }

    // overall position on a subject
    struct Position {
        string text; // e.g. "True" / "False" / "For" / "Against" / "The Earth is flat"

        // direct votes
        //   there will also be votes on arguments that can be accumulated for a final vote count
        uint votesFor;
        uint votesAgainst;

        Argument[]
    }

    struct Debate {
        // subject is determined by the id given by the consuming contract
        Position[] positions;
    }

    mapping(address => Debate[]) private Debates

    // functions
    function getDebate(uint id) public {
        return Debates[msg.sender][id];
    }
}
