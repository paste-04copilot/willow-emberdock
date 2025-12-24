import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  createPublicClient,
  http,
  formatEther,
  isAddress,
} from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETWORKS: Network[] = [
  {
    chain: baseSepolia,
    chainId: 84532,
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    label: "Base Sepolia",
  },
  {
    chain: base,
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    label: "Base Mainnet",
  },
];

let active = NETWORKS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Willow Emberdock (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const out = document.createElement("pre");
out.style.background = "#0c1120";
out.style.color = "#e2ebff";
out.style.padding = "14px";
out.style.borderRadius = "12px";
out.style.minHeight = "360px";

function log(lines: string[]) {
  out.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({ chain: active.chain, transport: http(active.rpc) });
}

async function connectWallet() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  const address = accounts?.[0];
  if (!address) throw new Error("Wallet returned no address");

  const chainHex = (await provider.request({ method: "eth_chainId" })) as string;
  const balance = await client().getBalance({ address: address as `0x${string}` });

  log([
    "Wallet connected",
    `Network: ${active.label}`,
    `chainId: ${parseInt(chainHex, 16)}`,
    `Address: ${address}`,
    `ETH balance: ${formatEther(balance)} ETH`,
    `${active.explorer}/address/${address}`,
  ]);
}

async function networkCheck() {
  const c = client();
  const [bn, gasPrice, block] = await Promise.all([
    c.getBlockNumber(),
    c.getGasPrice(),
    c.getBlock(),
  ]);

  log([
    "Network check",
    `Network: ${active.label}`,
    `Latest block: ${bn}`,
    `Timestamp: ${block.timestamp}`,
    `Gas used: ${block.gasUsed}`,
    `Gas price (wei): ${gasPrice.toString()}`,
    `${active.explorer}/block/${bn}`,
  ]);
}

async function addressCheck(target: string) {
  if (!isAddress(target)) throw new Error("Invalid address");
  const [bal, nonce] = await Promise.all([
    client().getBalance({ address: target as `0x${string}` }),
    client().getTransactionCount({ address: target as `0x${string}` }),
  ]);

  log([
    "Address check",
    `Network: ${active.label}`,
    `Address: ${target}`,
    `ETH balance: ${formatEther(bal)} ETH`,
    `Transaction count: ${nonce}`,
    `${active.explorer}/address/${target}`,
  ]);
}

function toggleNetwork() {
  active = active.chainId === 84532 ? NETWORKS[1] : NETWORKS[0];
  log([`Switched to ${active.label}. Reconnect wallet.`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "1040px";
  root.style.margin = "24px auto";
  root.style.fontFamily = "system-ui";

  const h1 = document.createElement("h1");
  h1.textContent = "Willow Emberdock";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexWrap = "wrap";
  controls.style.gap = "10px";
  controls.style.marginBottom = "12px";

  function btn(label: string, fn: () => void | Promise<void>) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = () => Promise.resolve(fn()).catch(e => log([String(e)]));
    return b;
  }

  const addrInput = document.createElement("input");
  addrInput.placeholder = "0x… address";
  addrInput.style.minWidth = "380px";

  controls.append(
    btn("Connect Wallet", connectWallet),
    btn("Toggle Network", toggleNetwork),
    btn("Network Check", networkCheck),
  );

  root.append(
    h1,
    controls,
    addrInput,
    btn("Check Address", () => addressCheck(addrInput.value)),
    out,
  );

  document.body.appendChild(root);
  log(["Ready", `Active network: ${active.label}`, "Read-only mode"]);
}

mount();

