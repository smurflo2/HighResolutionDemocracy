// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ETHDenverVotingMVP is Ownable {

uint public proposalID;
uint public LatestProposalID;

enum proposalStatus{OPEN, CLOSED}

struct Proposal {
    address creator;
    proposalStatus status;
    uint256 votingDistrict;
    uint256 yVotes;
    uint256 nVotes;
    string description;
    uint voteExpiration;
    mapping(address => VoterRecord ) VoterRecords;
}

struct VoterRecord {
        bool hasRegistered;
        bool hasVoted;
        bool vote;
        // This comes in later with QV...
        //uint256 weight;
}

struct VoterRegistration {
    uint256 voterDistrict;
    bool registered;
}

struct ProposalToken {
    uint propTokenID;

}

mapping(uint256 => Proposal) public Proposals;
mapping(address => VoterRegistration) public VoterRegistrations;

// Voter must register with the application in order to do anything
// Check the voter hasn't registered previously, then set the values in the struct for that user
function registerVoter(uint256 _votingDistrict) public {

    require(_votingDistrict != 0, "Invalid Voting District");
    VoterRegistration storage currentVoter = VoterRegistrations[msg.sender];
    require(currentVoter.registered == false, "Voter has already Registered");
    currentVoter.registered = true;
    currentVoter.voterDistrict = _votingDistrict;
}

function createProposal(string calldata _description, uint _voteExpiration) public {
 
    //Pulling the District information in from the sender, as only somebody in a district should be able to create a Proposal for that district
    uint256 _votingDistrict = VoterRegistrations[msg.sender].voterDistrict;
    require(_voteExpiration > 0, "Open Voting Period must not be 0");
    require(bytes(_description).length != 0, "Please fill out the proposal description");
 
    //Get current Timestamp
    uint deployDate = block.timestamp;
    console.log(deployDate);

    //Default is 0, Starts with 1
    proposalID++;
    
    Proposal storage currentProp = Proposals[proposalID];
    currentProp.creator = msg.sender;
    currentProp.status = proposalStatus.OPEN;
    currentProp.votingDistrict = _votingDistrict;
    //Timestamp is in seconds. Assuming VoteExpiration is in Days, converting to Seconds
    currentProp.voteExpiration = deployDate + (_voteExpiration * 24 * 60 * 60); 
    console.log(currentProp.voteExpiration);
    currentProp.description = _description;
    
}


function proposalRegistration(uint _proposalID) public {

    require(getProposalStatus(_proposalID) == proposalStatus.OPEN, "Sorry, Proposal is Closed");
    require(getVoterRegistrationStatus() == true, "User must register before joining a proposal");
    require(Proposals[_proposalID].votingDistrict == VoterRegistrations[msg.sender].voterDistrict, "User must reside in the district of the proposal to register");
    require(Proposals[_proposalID].VoterRecords[msg.sender].hasRegistered == false, "User has already registered for this proposal");
    
    Proposals[_proposalID].VoterRecords[msg.sender].hasRegistered == true;
    
    // Here, I need to assign voting tokens to the user for this specific proposal.  I need to make a new mapping for balances, but it can't be one token 
    // for everything, so I think it needs to be a mapping like (address => Another Struct), where the other Struct has an ID (which would be the proposalID
    // and then another uint which would be the token value the user gets.  This is a bit confusing so im stopping here at this point


}

function voting(uint _proposalID) public {
    //Check to make sure the user is registered
    require(Proposals[_proposalID].VoterRecords[msg.sender].hasRegistered == true, "You are not registered to vote for this Proposal");
    require(getProposalStatus(_proposalID) == proposalStatus.OPEN, "Sorry, Proposal is Closed for Voting");
    //Then we need to make a check if they have already voted (but is it okay if they vote once, and then want to go back and vote more , QV style?
    // I think so, so maybe we need to get the QV voting in here until they run out of those tokens that were given during the proposalRegistration

    // We then apply the tokens as votes for the proposal and update the voting mappings (this may not be correct as coded for multiple votes at this time, just one I think would work now
}

//Then we need the function to fetch / display the results of each proposal
//function results(uint _proposalID public returns)




// Function Checks for Requires //

// Function to check if the Proposal is currently open.
function getProposalStatus(uint _proposalID) public returns (proposalStatus) {
    uint currentTime = block.timestamp;
    uint expirationTime = Proposals[_proposalID].voteExpiration;
    require(expirationTime != 0, "Proposal has not been setup");

    if (currentTime < expirationTime) {
        Proposals[_proposalID].status = proposalStatus.OPEN;
    } else {
        Proposals[_proposalID].status = proposalStatus.CLOSED;
    }
    return Proposals[_proposalID].status;
}

//Function to check if user has registered to the application
function getVoterRegistrationStatus() public view returns (bool) {
    return VoterRegistrations[msg.sender].registered;
}

}
