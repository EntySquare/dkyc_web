<template>
  <div class="home_view">
    <div class="container">
      <div class="KYC_Disclaimer">
        <div class="KYC_Disclaimer_F">
          <div class="KYC_Disclaimer_logo">
            <img src="@/assets/images/logo.svg" alt="" />
          </div>
          <div class="KYC_Disclaimer_title">KYC免責聲明</div>
        </div>
        <div class="KYC_Disclaimer_text">規避各自風險，本平臺只收集</div>
      </div>
      <div class="card">
        <!-- <CallUpCamera />
        <HandSignature /> -->
        <FormValidation />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped lang="less">
.home_view {
  background: #005efe;

  min-height: calc(100vh);
  .container {
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
      min-height: calc(100vh);
      padding: 38px 20px;
      border-radius: 38px 38px 0px 0px;
      background: #fff;
      box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.18);
    }
  }
}
</style>
