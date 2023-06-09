export const contractABI = [
    {
      type: "function",
      name: "getMessage",
      constant: true,
      stateMutability: "view",
      payable: false,
      inputs: [],
      outputs: [{ type: "string" }],
    },
    {
      type: "function",
      name: "setMessage",
      constant: false,
      payable: false,
      inputs: [{ type: "string", name: "_message" }],
      outputs: [],
    },
  ];

  export const ETHERSCAN_API = "ZRIYWAFGFH1PTFGFP41RUQXGKB362RKDT4";
  export const POLYGONSCAN_API = "4GMAUEQAJDU5SIRT7HZ92Q16RDKVASJP8R";
  export const CONTRACT_ADDRESS = "0x921168AC6226b933B3020807f2602Df05e0D780E"
  export const contractAddress = "0x921168AC6226b933B3020807f2602Df05e0D780E"; 
  