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

  export const contractAddress = "0x921168AC6226b933B3020807f2602Df05e0D780E"; 