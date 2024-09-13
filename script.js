let walletAddress = '';
let timer;
let fundsReceived = false;
let addrInfo = "";
let provider = null;

document.getElementById('connectButton').addEventListener('click', connectWallet);

if (typeof Web3Modal === 'undefined' || typeof ethers === 'undefined') {
	alert('Web3Modal or ethers.js not loaded. Please check the script URLs.');
}

async function connectWallet() {
	const web3Modal = new Web3Modal.default({
		network: "mainnet",
		cacheProvider: false, // Optional
		providerOptions: {} // Add provider options if needed
	});

	try {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
		const connection = await web3Modal.connect();
		const pv = new ethers.BrowserProvider(connection);
		const signer = pv.getSigner();
    const {address} = await signer;
		walletAddress = address; // Set walletAddress
		document.getElementById('walletAddress').innerText = `Connected address: ${walletAddress}`;

		startTimer(600); // 10 minutes in seconds
		fundsReceived = false;
		document.getElementById('statusMessage').innerText = '';
	} catch (error) {
		console.error("Connection error:", error);
		document.getElementById('statusMessage').innerText = 'Connection failed. Please try again.';
	}
}

function startTimer(duration) {
	let timeRemaining = duration;

	timer = setInterval(() => {
		if (timeRemaining <= 0) {
			clearInterval(timer);
			checkForFunds(walletAddress);
		} else {
			const minutes = Math.floor(timeRemaining / 60);
			const seconds = timeRemaining % 60;
			document.getElementById('timer').innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
			timeRemaining--;
		}
	}, 1000);
}

function checkForFunds(address) {
	// Simulate checking for funds (replace this with actual logic)
	setTimeout(() => {
		fundsReceived = true;
		document.getElementById('statusMessage').innerText = 'Funds Received!';
	}, 5000); // Simulate funds received after 5 seconds
}