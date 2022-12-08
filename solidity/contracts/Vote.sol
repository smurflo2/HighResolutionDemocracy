// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ETHDenverVotingMVP is Ownable {

    uint256 public proposalID;
    //uint256 public cycleID;
    //uint256 public LatestProposalID;

    // 4 different statuses for a proposal cycle
    //enum cycleStatus{OPEN, DISCUSSION, VOTING, CLOSED}

    /*
    struct Cycle{
        string cycleTitle;
        uint256 cycleDistrict;
        cycleStatus status;
        uint cycleExpiration;
    }
    */
    //mapping(uint256 => Cycle) public CycleDirectory;

    //**** Proposal Setup ****//
    struct Proposal {
        address creator;
        uint256 votingDistrict;
        uint256 yVotes;
        uint256 nVotes;
        string title;
        string description;
        uint256 proposalID;
        //mapping(address => VoterRecord ) VoterRecords;
    }

    /*
    struct VoterRecord { 
            bool hasVoted;
            bool vote;
            // This comes in later with QV...
            //uint256 weight;
    }
    */

    mapping(uint256 => Proposal) public Proposals;
    Proposal[] ProposalArray; 


    // Voter Registrations - Establishing District and if that address has been registered 
    struct VoterRegistration {
        bool registered;
        uint256 voterDistrict;
    }

    mapping(address => VoterRegistration) public VoterRegistrations;

    // Mapping created to store user addresses and their corresponding balances
    mapping (address => uint256) public VoteTokenBalances;

    // Address array ...
   address[] VoterAddresses;

    // Voter must register with the application in order to do anything
    // Check the voter hasn't registered previously, then set the values in the struct for that user
    function registerVoter(uint256 _votingDistrict) public {

        require(_votingDistrict != 0, "Invalid Voting District");
        VoterRegistration storage currentVoterReg = VoterRegistrations[msg.sender];
        require(currentVoterReg.registered == false, "Voter has already Registered");
        currentVoterReg.registered = true;
        currentVoterReg.voterDistrict = _votingDistrict;

        VoteTokenBalances[msg.sender] = 100; 
        VoterAddresses.push(msg.sender);
    }

    function createProposal(string calldata _title, string calldata _description, uint256 _votingDistrict) public {
        
        //Require to make sure the Cycle is open
        //require(getCycleStatus(cycleID) == cycleStatus.OPEN,"Sorry, the current Cycle is not Open");
        //Require to make sure you can only create a Proposal which you registered to
        require(VoterRegistrations[msg.sender].voterDistrict == _votingDistrict,"You can only make a proposal for your district");
        require(bytes(_description).length != 0, "Please fill out the proposal description");

        //Default is 0, Starts with 1
        proposalID++;
        
        Proposal storage currentProp = Proposals[proposalID];
        currentProp.creator = msg.sender;
        currentProp.votingDistrict = _votingDistrict;
        currentProp.title = _title;
        currentProp.description = _description;
        currentProp.proposalID = proposalID;

        // The logic missing here is how do we associate the Proposal to a District - just haven't go that far 
        
    }

    function getAllProposals() public view returns (Proposal[] memory){
        Proposal[] memory toReturn = new Proposal[](proposalID);
        for (uint i = proposalID; i > 0; i--) {
            toReturn[i-1] = Proposals[i];
        }
        return toReturn;
    }

    function vote(uint _proposalID, uint _numOfVotes, bool isY) public {
        uint cost = _numOfVotes * _numOfVotes;
        require(VoteTokenBalances[msg.sender] >= cost, "User does not have enough Voting Tokens for this vote");

        if (isY){
            Proposals[_proposalID].yVotes += _numOfVotes;
        }
        else {
            Proposals[_proposalID].nVotes += _numOfVotes;
        }
        // We need to subtract cost here from msg.sender balance
        VoteTokenBalances[msg.sender] -= cost; 
    }

    function resetTokenBalances() public onlyOwner() {
        for (uint i = 0; i < VoterAddresses.length; i++) {
        VoteTokenBalances[VoterAddresses[i]] = 100;
        }
    }

    function getBalance(address _address) public view returns (uint) {
        return VoteTokenBalances[_address];
    }


    /*
    function createProposalCycle(string calldata _title, uint256 _cycleDistrict, uint _cycleExpiration) public onlyOwner() {

        //Get current Timestamp
        uint deployDate = block.timestamp;
        console.log(deployDate);
        //Default is 0, 1st iteration will set it to 1, and so on with new cycles
        cycleID++;
        
        Cycle storage currentCycle = CycleDirectory[cycleID];
        currentCycle.cycleTitle = _title;
        currentCycle.cycleDistrict = _cycleDistrict;
        currentCycle.status = cycleStatus.OPEN;

        //Timestamp is in seconds. Assuming VoteExpiration will be submitted in Days, we will convert everythign into seconds
        currentCycle.cycleExpiration = deployDate + (_cycleExpiration * 24 * 60 * 60); 
        console.log(currentCycle.cycleExpiration);
        
    }

    function cycleRegistration() public {

        //Require to make sure the Cycle is open
        require(getCycleStatus(cycleID) == cycleStatus.OPEN,"Sorry, the current Cycle is not Open");
        // Require user has registered
        require(getVoterRegistrationStatus() == true, "User must register before joining a proposal");
        // Require that the User's distict matches the current Cycle District
        require(CycleDirectory[cycleID].cycleDistrict == VoterRegistrations[msg.sender].voterDistrict,"User must reside in the district to register to this cycle");
        
        
        // Okay so here we need to give them the tokens, voting and discussion //
    }
    */

    // Function Checks for Requires //
    /*
    //Function Check for User Registration
    function getVoterRegistrationStatus() public view returns (bool) {
        return VoterRegistrations[msg.sender].registered;
    }


    //Function Check for Cycle Status - Used by other functions to ensure the Cycle is Open - Will need to adjust for Voting Time later
    function getCycleStatus(uint256 _cycleID) public returns (cycleStatus) {

        uint currentTime = block.timestamp;
        Cycle storage currentCycle = CycleDirectory[_cycleID];

        uint expirationTime = currentCycle.cycleExpiration;
        require(expirationTime != 0, "Proposal has not been setup");

        if (currentTime < expirationTime) {
            currentCycle.status = cycleStatus.OPEN;
        } else {
            currentCycle.status = cycleStatus.CLOSED;
        }

        return CycleDirectory[_cycleID].status;
    }
    */

}
