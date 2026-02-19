// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * ============================================================================
 * COMPLIANCE LOG - AI-NOTARY (RIFT 2026)
 * ============================================================================
 * Immutable, tamper-evident audit trail for AI-agent code fixes.
 * 
 * Every time the self-healing agent finds a bug and applies a fix,
 * a signed attestation manifest is recorded on-chain containing:
 * - The specific error found (LINTING, SYNTAX, RUNTIME, etc.)
 * - The fix description / reasoning
 * - Test results before and after
 * - Commit SHA, file path, timestamp
 *
 * Deployed on Sepolia testnet.
 */
contract ComplianceLog {

    // ════════════════════════════════════════════════════════════════════
    // TYPES
    // ════════════════════════════════════════════════════════════════════

    struct Attestation {
        string sessionId;       // Healing session ID
        string bugCategory;     // LINTING | SYNTAX | RUNTIME | LOGIC | SECURITY | PERFORMANCE
        string filePath;        // File that was fixed
        uint256 line;           // Line number
        string errorMessage;    // The specific error found
        string fixDescription;  // AI reasoning for the fix
        bool testBeforePassed;  // Did tests pass BEFORE the fix?
        bool testAfterPassed;   // Did tests pass AFTER the fix?
        string commitSha;       // Git commit SHA of the fix
        uint256 timestamp;      // Block timestamp
        address agent;          // Address of the signing agent
    }

    // ════════════════════════════════════════════════════════════════════
    // STATE
    // ════════════════════════════════════════════════════════════════════

    /// @notice The authorized agent address (deployer)
    address public immutable authorizedAgent;

    /// @notice All attestations in order
    Attestation[] public attestations;

    /// @notice Session ID → attestation indices
    mapping(string => uint256[]) private sessionAttestations;

    /// @notice Total attestation count
    uint256 public attestationCount;

    // ════════════════════════════════════════════════════════════════════
    // EVENTS
    // ════════════════════════════════════════════════════════════════════

    event AttestationRecorded(
        uint256 indexed id,
        string sessionId,
        string bugCategory,
        string filePath,
        string commitSha,
        uint256 timestamp
    );

    // ════════════════════════════════════════════════════════════════════
    // MODIFIERS
    // ════════════════════════════════════════════════════════════════════

    modifier onlyAgent() {
        require(msg.sender == authorizedAgent, "ComplianceLog: unauthorized");
        _;
    }

    // ════════════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ════════════════════════════════════════════════════════════════════

    constructor() {
        authorizedAgent = msg.sender;
    }

    // ════════════════════════════════════════════════════════════════════
    // WRITE FUNCTIONS
    // ════════════════════════════════════════════════════════════════════

    /**
     * @notice Record an attestation for a code fix
     * @dev Only callable by the authorized agent wallet
     */
    function recordAttestation(
        string calldata _sessionId,
        string calldata _bugCategory,
        string calldata _filePath,
        uint256 _line,
        string calldata _errorMessage,
        string calldata _fixDescription,
        bool _testBeforePassed,
        bool _testAfterPassed,
        string calldata _commitSha
    ) external onlyAgent returns (uint256) {
        uint256 id = attestationCount;

        attestations.push(Attestation({
            sessionId: _sessionId,
            bugCategory: _bugCategory,
            filePath: _filePath,
            line: _line,
            errorMessage: _errorMessage,
            fixDescription: _fixDescription,
            testBeforePassed: _testBeforePassed,
            testAfterPassed: _testAfterPassed,
            commitSha: _commitSha,
            timestamp: block.timestamp,
            agent: msg.sender
        }));

        sessionAttestations[_sessionId].push(id);
        attestationCount++;

        emit AttestationRecorded(
            id,
            _sessionId,
            _bugCategory,
            _filePath,
            _commitSha,
            block.timestamp
        );

        return id;
    }

    // ════════════════════════════════════════════════════════════════════
    // READ FUNCTIONS
    // ════════════════════════════════════════════════════════════════════

    /**
     * @notice Get all attestation IDs for a session
     */
    function getSessionAttestationIds(string calldata _sessionId) 
        external view returns (uint256[] memory) 
    {
        return sessionAttestations[_sessionId];
    }

    /**
     * @notice Get a single attestation by ID
     */
    function getAttestation(uint256 _id) 
        external view returns (Attestation memory) 
    {
        require(_id < attestationCount, "ComplianceLog: invalid id");
        return attestations[_id];
    }

    /**
     * @notice Get attestation count for a specific session
     */
    function getSessionAttestationCount(string calldata _sessionId) 
        external view returns (uint256) 
    {
        return sessionAttestations[_sessionId].length;
    }
}
