<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    label-position="top"
  >
    <el-form-item label="1. 姓名" prop="name">
      <el-input
        clearable
        v-model.trim="ruleForm.name"
        placeholder="輸入姓名"
        @input="handleInputChange('name', $event)"
      />
    </el-form-item>
    <el-form-item label="2. 身份證號碼" prop="DocumentNumber">
      <el-input
        clearable
        v-model.trim="ruleForm.DocumentNumber"
        placeholder="輸入您的身份證號碼"
      />
    </el-form-item>
    <el-form-item label="3. 手機號" prop="Mobile">
      <el-input clearable v-model="ruleForm.Mobile" placeholder="輸入手機號" />
    </el-form-item>
    <el-form-item label="4. 通訊地址" prop="MailingAddress">
      <el-input
        clearable
        v-model.trim="ruleForm.MailingAddress"
        placeholder="輸入通訊地址"
      />
    </el-form-item>
    <el-form-item label="5. 買/賣" prop="Business">
      <el-select
        v-model.trim="ruleForm.Business"
        placeholder="選擇買/賣"
        size="large"
        style="width: 100%"
      >
        <el-option
          v-for="item in BusinessOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value == '1' ? '買' : '賣'"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="6. 金額" prop="Amount">
      <el-input
        clearable
        v-model.trim="ruleForm.Amount"
        placeholder="輸入金額"
      />
    </el-form-item>
    <el-form-item label="7. 資金來源" prop="SourceOfFundsValue">
      <el-select
        v-model.trim="ruleForm.SourceOfFundsValue"
        placeholder="選擇資金來源"
        size="large"
        style="width: 100%"
      >
        <el-option
          v-for="item in SourceOfFundsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="8. 委託買費用途" prop="UseOfExpensesValue">
      <el-select
        v-model.trim="ruleForm.UseOfExpensesValue"
        placeholder="選擇委託買費用途"
        size="large"
        style="width: 100%"
      >
        <el-option
          v-for="item in UseOfExpensesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="9. 接收者錢包位址（選填)" prop="WalletAddress">
      <el-input
        clearable
        v-model.trim="ruleForm.WalletAddress"
        placeholder="輸入接收者錢包位址（選填)"
      />
    </el-form-item>
    <el-form-item
      label="10. 是否有五級等以內為重要政治性職務人士"
      prop="officialValue"
    >
      <el-select
        v-model.trim="ruleForm.officialValue"
        placeholder="選擇"
        size="large"
        style="width: 100%"
      >
        <el-option
          v-for="item in officialOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="11. 上傳身分證照片">
      <UploadIDCard
        :id="random16DigitNumber"
        style="margin-top: 2px"
        @update="handleUpdate"
      />
      <!-- <div style="color: aqua">
        <p>正面照片状态: {{ frontStatus }}</p>
        <p>反面照片状态: {{ backStatus }}</p>
      </div> -->
    </el-form-item>
    <!-- <el-form-item label="12. 上傳聲明影片">
      <div class="textAndImg">
        <div class="text_content">
          請在填寫上述資訊後，上傳您的聲明視頻，影片中需露出完整臉部並讀出以下文字
          :
        </div>
        <div class="text_content1">
          <span class="overbold"
            >本人<span
              class="texs"
              :style="{
                borderBottom: ruleForm.name ? '2px solid #005efe' : 'none'
              }"
              >{{ ruleForm.name ? ruleForm.name : '______' }} </span
            >買/賣(虚擬通貨貨幣)<span
              class="texs"
              :style="{
                borderBottom: ruleForm.Business ? '2px solid #005efe' : 'none'
              }"
              >{{ ruleForm.Business ? ruleForm.Business : '______' }} </span
            >相當於新臺幣<span
              class="texs"
              :style="{
                borderBottom: ruleForm.Amount ? '2px solid #005efe' : 'none'
              }"
              >{{ ruleForm.Amount ? ruleForm.Amount : '______' }}</span
            >元之虚擬通貨。</span
          >
          此委託行為保證皆為本人親自操作，如有不實、願負一切法律責任，本人保證上開帳
          戶之資金來源正常，絕非以非法手段(例如詐騙、毒品交易等)取得之金錢，且對於
          委託購質之虚擬通貨之真實性、價值性、有效性及用途均清楚知悉。本人保證絕不會
          涉及任何不法詐騙、洗錢或任何犯罪行為。上述聲明內容如有違反，本人願自行承擔
          一切相關法律風險，如對貴服務處造成任何損害，願意賠償貴服務處相當於委託金额
          十倍之懲罰性違約金，並為此支出之律師費用。
        </div>
      </div>
      <DeclarationVideo
        :id="random16DigitNumber"
        style="margin-top: 2px"
        @update="videoHandleUpdate"
      />
    </el-form-item> -->

    <el-form-item class="item__content_bg" label="12.免责协议签名 ">
      <div class="DisclaimerAgreement">
        <div class="agreement_left">《免責協議文件》</div>
        <el-button
          class="agreement_right"
          @click="handleSubmit(ruleFormRef, 'sign')"
          >查看並簽名</el-button
        >
        <!-- <ConvertJsonDataToPdf /> -->
      </div>
    </el-form-item>
    <!-- <el-form-item>
      <el-button
        class="SaveCommit"
        type="primary"
        @click="handleSubmit(ruleFormRef, 'submit')"
      >
        儲存提交
      </el-button>
    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  ElMessage,
  type ComponentSize,
  type FormInstance,
  type FormRules
} from 'element-plus'
import router from '@/router'
import useFormStore from '@/store/modules/formStore'
import useImageStore from '@/store/modules/imageStores'

interface UpdateEvent {
  type: 'idcardf' | 'idcardb'
  status: 'success' | 'error' | 'removed'
}

const handleInputChange = (field: keyof RuleForm, event: InputEvent) => {
  const value = (event.target as HTMLInputElement).value
  // 去除空格
  ruleForm[field] = value.replace(/\s+/g, '')
}

const statusValue = useImageStore()
const handleUpdate = ({ type, status }: UpdateEvent) => {
  if (type === 'idcardf') {
    statusValue.frontStatus = status
  } else if (type === 'idcardb') {
    statusValue.backStatus = status
  }
}

const formStore = useFormStore()
const form = formStore.form

// 定义一个响应式变量，用于存储生成的随机18位数
const random16DigitNumber =
  form.hash !== '' ? ref(form.hash) : ref(generateRandom16DigitNumber())

// 生成18位随机数的函数
function generateRandom16DigitNumber(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let hash = ''
  for (let i = 0; i < 18; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    hash += characters[randomIndex]
  }

  return hash
}

// const videoHandleUpdate = (payload: { status: string }) => {
//   statusValue.videoHandleStatus = payload.status
//   if (payload.status === 'success') {
//     // ElMessage.success('视频上传成功')
//   } else if (payload.status === 'error') {
//     // ElMessage.error('视频上传失败')
//   } else if (payload.status === 'removed') {
//     // ElMessage.info('视频已移除')
//   }
// }
interface RuleForm {
  hash: string // 隐藏字段
  name: string // 姓名
  DocumentNumber: string // 身份证号码
  Mobile: string // 手机号
  MailingAddress: string // 通讯地址
  Business: string // 买/卖
  Amount: string // 金额
  SourceOfFundsValue: string // 资金来源
  UseOfExpensesValue: string // 委托买费用途
  WalletAddress: string // 接收方钱包地址
  officialValue: string // 是否有五级等以内为重要政治性职务人士
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  hash: random16DigitNumber.value,
  name: form.name.trim() || '',
  DocumentNumber: form.DocumentNumber || '',
  Mobile: form.Mobile || '',
  Business: form.Business || '',
  Amount: form.Amount || '',
  SourceOfFundsValue: form.SourceOfFundsValue || '',
  UseOfExpensesValue: form.UseOfExpensesValue || '',
  officialValue: form.officialValue || '',
  MailingAddress: form.MailingAddress || '',
  WalletAddress: form.WalletAddress || ''
})

// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'change' },
    { min: 2, max: 11, message: '長度應該在2到11之間', trigger: 'change' }
  ],
  DocumentNumber: [
    { required: true, message: '請輸入證件號碼', trigger: 'change' },
    { min: 10, max: 10, message: '長度應為10位', trigger: 'change' }
    //正则
    // {
    //   pattern:
    //     /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    //   message: '请输入正确的证件号码',
    //   trigger: 'change'
    // }
  ],
  Mobile: [
    { required: true, message: '請輸入手機號', trigger: 'change' },
    {
      pattern: /^[0-9]*$/,
      message: '請輸入正確的手機號',
      trigger: 'change'
    }
  ],
  Business: [{ required: true, message: '請選擇買/賣', trigger: 'change' }],
  MailingAddress: [
    { required: true, message: '請輸入通訊地址', trigger: 'change' }
  ],
  Amount: [
    { required: true, message: '請輸入金額', trigger: 'change' },
    {
      pattern: /[1-9]\d*/,
      message: '請輸入正確的資金',
      trigger: 'change'
    }
  ],
  SourceOfFundsValue: [
    { required: true, message: '請選擇資金來源', trigger: 'change' }
  ],
  UseOfExpensesValue: [
    { required: true, message: '請選擇委託買費用途', trigger: 'change' }
  ],
  WalletAddress: [
    // { required: true, message: '请输入接收方钱包地址', trigger: 'change' }
  ],
  officialValue: [
    {
      required: true,
      message: '請選擇是否有五級等以內為重要政治性職務人士',
      trigger: 'change'
    }
  ]
})

const validateForm = async (
  formEl: FormInstance | undefined
): Promise<boolean> => {
  if (!formEl) return false

  let valid = true
  await formEl.validate((isValid, fields) => {
    if (!isValid) {
      valid = false
      // console.log('error submit!', fields)
    }
  })

  if (!valid) {
    ElMessage.error('請填寫完整資訊')
    return false
  }

  if (
    !ruleForm.name ||
    !ruleForm.DocumentNumber ||
    !ruleForm.Mobile ||
    !ruleForm.MailingAddress ||
    !ruleForm.Business ||
    !ruleForm.Amount ||
    !ruleForm.SourceOfFundsValue ||
    !ruleForm.UseOfExpensesValue ||
    !ruleForm.officialValue
  ) {
    ElMessage.error('請填寫完整資訊')
    return false
  }

  if (
    statusValue.frontStatus !== 'success' ||
    statusValue.backStatus !== 'success'
  ) {
    ElMessage.error('請上傳身分證照片')
    return false
  }

  // if (statusValue.videoHandleStatus !== 'success') {
  //   ElMessage.error('請上傳聲明視頻')
  //   return false
  // }

  return true
}
const handleSubmit = async (
  formEl: FormInstance | undefined,
  action: string
) => {
  const isValid = await validateForm(formEl)
  // const isValid = true

  if (isValid) {
    if (action === 'submit') {
      // 提交逻辑
    } else if (action === 'sign') {
      // 签名逻辑
      formStore.setFormData(ruleForm)
      router.push({
        path: '/viewAndSign'
      })
    }
  }
}

const SourceOfFundsOptions = ref([
  { value: '1', label: '活期存款' },
  { value: '2', label: '儲蓄存款' },
  { value: '3', label: '借貸款' },
  { value: '4', label: '股票' },
  { value: '5', label: '債券' },
  { value: '6', label: '其他' }
])

const UseOfExpensesOptions = ref([
  { value: '1', label: '投資理財' },
  { value: '2', label: '消費性產品' },
  { value: '3', label: '旅遊' },
  { value: '4', label: '資金周轉' },
  { value: '5', label: '其他' }
])

const officialOptions = ref([
  { value: '1', label: '是' },
  { value: '2', label: '否' }
])
const BusinessOptions = ref([
  { value: '1', label: '買' },
  { value: '2', label: '賣' }
])

onMounted(() => {})
</script>

<style scoped lang="less">
.texs {
  color: #005efe;
  // 下划线
}
.textAndImg {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  color: #404b7c;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;

  .text_content1 {
    color: #4b4b4b;
    .overbold {
      font-weight: 500;
    }
  }
}
:deep(.is-transparent) {
  color: #d5d5d5;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
:deep(.el-select__placeholder) {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
:deep(.el-select__wrapper) {
  padding: 10px 11px !important;
  min-height: 44px !important;
  border-radius: 8px;
  background: #f6f6f6;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
}
.SaveCommit {
  border-radius: 4px;
  background: #005efe;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 54px;
  color: #fff;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.DisclaimerAgreement {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 11px;
  margin-bottom: 120px;
  .agreement_left {
    display: flex;
    flex: 2;
    // width: 230px;
    height: 44px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #005efe;
    background: #f6f6f6;
    color: #4b4b4b;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .agreement_right {
    flex: 1;
    display: flex;
    width: 114px;
    height: 44px;

    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #005efe;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    color: #d5d5d5;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

:deep(.el-form-item__label) {
  color: #404b7c;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
:deep(.el-form-item__label::before) {
  content: '' !important;
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
</style>
