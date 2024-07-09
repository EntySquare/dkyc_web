<template>
  <div class="home_view">
    <HandSignature
      v-model:dialogVisible="dialogVisible"
      @signatureSubmitted="handleSignatureSubmitted"
    />
    <HandSignature
      v-model:dialogVisible="dialogVisible1"
      @signatureSubmitted="handleSignatureSubmitted1"
    />
    <div class="TradingDisclaime">
      <!-- pdf第一页开始 -->
      <div id="pdf-content">
        <div class="TradingDisclaime_title">虚擬通貨交易免責聲明</div>
        <div class="TradingDisclaimeOne">
          <div class="F-500-000">交易須知:</div>
          <p class="F-400-16">
            1.
            貴用戶理解，從事虛礙通就投資交易有一定之風險，並非保證獲利，貴用戶應自行研究委
            託代購之商品之真實、價值性及有效性。貴用戶於收到依費用戶指定代為購買之比特幣、
            USOT或其他虛擬通資後，本次委任關係即為完成，貴用戶不能(1)以任何理由解除、搬
            銷、撤回、終止購買虛擬貨幣之委任契約(2)主張返回本服務處代為購買之任何虛擬通
            貨。(3)要求本服務處返還任何金錢，委任費用。(4)主張本服務處有許欺或其他犯罪情
            事。
          </p>
          <p class="F-400-16">
            如有違反，貴用戶同意赔償本服務處相當於該次委任费用十倍數額之懲罰性違的金，本服務
            處並委託律師對貴用戶提起相應之法律程序，貴用戶並應支付本服務處為此支出之律師委任
            費用。
          </p>
          <p class="F-400-16">
            2.
            本服務處係接受貴用戶委任，代為買賣、交易、移轉虛擬通貨之服務商，本服務處不參與
            任何處擬通資投資平台之行政及營揮，亦非虚擬通貨之實際買家或賣家。
          </p>
          <p class="F-400-16">
            3.
            貴用戶透過本代為購入虛擬通貨之價格，應依照貴用戶指定購入之幣別及交易時間之火
            幣平台现貨，幣安平台现貨之即時行情進行計算。
          </p>
          <p class="F-400-16">
            4.
            在您同意後交易契約始成立，一切紀錄内容將作為履約憑證，您收到我方給付之比特幣或
            USDT或其它虚疑通貨後，不得再以任何理由解除貫賣契約，或主張受詐欺或其他犯罪被害
            ，若有違反，應賠償相當交易金额十倍之懲罰性違約金，對無端造事者將由委任律師提刑事
            告訴则民事損害賠償，且應賠償我方支付之律師費用。
          </p>
          <p class="F-400-16">
            5.
            貴用户透過本服務代為購買並收到本服務處給付之比特幣、USDT或其它虛擬通貨後，一
            切行為概與本服務處量無涉。貴用戶並應保證絕無利用本服務處代為購入之虚擬通貨進行洗
            錢或從事任何犯罪行為之情形。如有因此造成本服務處產生任何損害，貴用戶並承諾賠償本
            服務處因此產生之損失。
          </p>
          <p class="F-400-16">
            6.
            貴用戶保證不使用匿名或假名身分，且所有填寫，提供予本服務處之文件、資料及個人身
            份證明文件均正確無誤，如因提供任何不實資訊，以致產生任何刑事、行政或民事責任，全
            由貴用戶自行負責。如有因此造成本服務處產生任何損害，貴用戶並承諾賠償本服務處因此
            產生之損失。
          </p>
          <p class="F-400-16">
            7.
            貴用戶同意本服務處得於業務必要範圍内蒐集、利用及處理貴用戶之個入資料，並依相關
            政府法令或政府單位、司法單位之要求，提供貴用戶之個人資料。
          </p>
          <p class="F-400-16">
            8.
            如經本服務處發現貴用戶有疑似下列情形時，本服務處得逕行拒絕或終止對貴用戶提供服
            務:(1)疑似使用匿名、假名、人頭。虛設行號或法人建立業務關係。(2)不尋常拖延或拒絕
            提供身分相關證明文件。(3)持用或疑似持用偽、變造身分證明文件。(4)有刑事詐欺、洗錢
            等刑事犯罪前料。
          </p>
          <div class="ConsentClause">
            <el-checkbox
              v-model="checked"
              label="我本人已閱請以上條款 : "
              size="large"
            />
            <div class="Q_signature" @click="dialogVisible = true">
              <div v-if="!signatureImage">點擊簽名</div>
              <div v-if="signatureImage" class="signature-display">
                <img
                  :src="signatureImage"
                  alt="签名图片"
                  class="signature-img"
                />
              </div>
            </div>
          </div>
          <div class="RepublicOfChina">
            中華民國 <span class="texs">{{ year }}</span> 年
            <span class="texs">{{ month }}</span> 月
            <span class="texs">{{ day }}</span> 日
          </div>
        </div>
      </div>
      <!-- pdf第一页结束 -->

      <!-- pdf第二页开始 -->
      <div
        style="display: flex; flex-direction: column; gap: 15px"
        id="pdf-content1"
      >
        <div class="TradingDisclaimeTwo">
          <p class="F-400-16">
            9.
            如貴用戶使用本服務處提供之服務時，視為已閱讀並接受本聲明書一切條款。
          </p>
          <p class="F-400-16">
            10.
            雙方如因本聲明書內容發生糾紛，同意以台灣地方法院為第一審管轄法院。
          </p>
          <p class="F-400-16">
            11. 資金來源: <span class="texs">{{ SourceOfFundsValue }}</span>
          </p>
          <p class="F-400-16">
            12. 委託買費用途:
            <span class="texs">{{ UseOfExpensesOptions }}</span>
          </p>
          <p class="F-400-16">
            13. 接收方錢包地址:
            <span class="texs">{{
              form.WalletAddress ? form.WalletAddress : '無'
            }}</span>
          </p>
          <p class="F-400-16">
            14. 是否有五級等以內為重要政治性職務人士:
            <span class="texs">{{
              form.officialValue == '1' ? '是' : '否'
            }}</span>
          </p>
        </div>
        <div class="SignatureIDCard">
          簽署人姓名: <span class="texs">{{ form.name }}</span> 身分證字號:
          <span class="texs">{{ form.DocumentNumber }}</span> 手機號碼:
          <span class="texs">{{ form.Mobile }}</span> 。
        </div>

        <div class="bigCard">
          <div class="CardTitle">特此聲明</div>
          <div class="text_content1">
            <span class="overbold"
              >本人
              <span class="texs"> {{ form.name }} </span> 買/賣(虚擬通貨貨幣)
              <span class="texs">{{ form.Business }} </span> 相當於新臺幣
              <span class="texs">{{ form.Amount }}</span> 元之虚擬通貨。</span
            >
            此委託行為保證皆為本人親自操作，如有不實、願負一切法律責任，本人保證上開帳
            戶之資金來源正常，絕非以非法手段(例如詐騙、毒品交易等)取得之金錢，且對於
            委託購質之虚擬通貨之真實性、價值性、有效性及用途均清楚知悉。本人保證絕不會
            涉及任何不法詐騙、洗錢或任何犯罪行為。上述聲明內容如有違反，本人願自行承擔
            一切相關法律風險，如對貴服務處造成任何損害，願意賠償貴服務處相當於委託金额
            十倍之懲罰性違約金，並為此支出之律師費用。
          </div>
          <div class="SignatureArea" @click="dialogVisible1 = true">
            <div class="PleaseSign" v-if="!signatureImage1">請簽名</div>
            <div v-if="signatureImage1" class="PleaseSignImg">
              <img
                :src="signatureImage1"
                alt="签名图片"
                class="PleaseSignImg-img"
              />
            </div>
          </div>
        </div>
        <div class="RepublicOfChina">
          中華民國 <span class="texs">{{ year }}</span> 年
          <span class="texs">{{ month }}</span> 月
          <span class="texs">{{ day }}</span> 日
        </div>
      </div>
      <!-- pdf第二页结束 -->
    </div>

    <div style="width: 100%; display: flex; justify-content: end">
      <div
        v-loading.fullscreen.lock="loading"
        class="SubmissionOfDeclaration"
        @click="generatePDF"
      >
        提交聲明
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useFormStore from '@/store/modules/formStore'
import { onMounted, reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { FormUpload, uploadImage } from '@/api/upload'
import { Action, ElMessage, ElMessageBox } from 'element-plus'
import useImageStore from '@/store/modules/imageStores'

const loading = ref(false)
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const signatureImage = ref<string | null>(null)
const signatureImage1 = ref<string | null>(null)

const formStore = useFormStore()
const form = formStore.form

interface RuleFormRequest {
  hash: string // 隐藏字段
  name: string // 姓名
  id_card: string // 身份证号码
  phone: string // 手机号
  mail_address: string // 通讯地址
  amount: number // 金额
  buy_or_sell: number // 买/卖 (1-买, 2-卖)

  funding_source: number // 资金来源 (1-活期存款, 2-储蓄存款, 3-借贷款, 4-股票, 5-债券, 6-其他)
  use_for: number // 委托买费用途 (按实际情况处理) 投资理财1/消费性产品2/旅游3/资金周转4/其他5
  wallet_address: string // 接收方钱包地址
  political: number // 是否有五级等以内为重要政治性职务人士 (1-是, 2-否)
}

const formRequest = reactive<RuleFormRequest>({
  hash: form.hash,
  name: form.name,
  id_card: form.DocumentNumber,
  phone: form.Mobile,
  mail_address: form.MailingAddress,
  amount: Number(form.Amount),
  buy_or_sell: form.Business == '買' ? 1 : 2,
  funding_source: Number(form.SourceOfFundsValue),
  use_for: Number(form.UseOfExpensesValue),
  wallet_address: form.WalletAddress,
  political: Number(form.officialValue)
})

if (form.name == '') {
  router.push('/')
}

const checked = ref(true)
const handleSignatureSubmitted = (image: string) => {
  signatureImage.value = image
}
const handleSignatureSubmitted1 = (image: string) => {
  signatureImage1.value = image
}
onMounted(() => {
  year.value = getCurrentDate().year
  month.value = getCurrentDate().month
  day.value = getCurrentDate().day
  SourceOfFundsValuefun()
  UseOfExpensesOptionsfun()
})
const year = ref<string>('')
const month = ref<string>('')
const day = ref<string>('')

// 获取当前日期
const getCurrentDate = (): {
  year: string
  month: string
  day: string
} => {
  const today = new Date()
  const year = String(today.getFullYear())
  const month = String(today.getMonth() + 1).padStart(2, '0') // 月份从0开始，所以需要加1
  const day = String(today.getDate()).padStart(2, '0')

  return { year, month, day }
}
const SourceOfFundsValue = ref()
const SourceOfFundsValuefun = () => {
  if (form.SourceOfFundsValue == '1') {
    SourceOfFundsValue.value = '活期存款'
  } else if (form.SourceOfFundsValue == '2') {
    SourceOfFundsValue.value = '儲蓄存款'
  } else if (form.SourceOfFundsValue == '3') {
    SourceOfFundsValue.value = '借貸款'
  } else if (form.SourceOfFundsValue == '4') {
    SourceOfFundsValue.value = '股票'
  } else if (form.SourceOfFundsValue == '5') {
    SourceOfFundsValue.value = '債券'
  } else if (form.SourceOfFundsValue == '6') {
    SourceOfFundsValue.value = '其他'
  }
}
const UseOfExpensesOptions = ref()
const UseOfExpensesOptionsfun = () => {
  if (form.UseOfExpensesValue == '1') {
    UseOfExpensesOptions.value = '投資理財'
  } else if (form.UseOfExpensesValue == '2') {
    UseOfExpensesOptions.value = '消費性產品'
  } else if (form.UseOfExpensesValue == '3') {
    UseOfExpensesOptions.value = '旅遊'
  } else if (form.UseOfExpensesValue == '4') {
    UseOfExpensesOptions.value = '資金周轉'
  } else if (form.UseOfExpensesValue == '5') {
    UseOfExpensesOptions.value = '其他'
  }
}

// 生成 PDF 并上传到服务器
const generatePDF = async () => {
  //判断是否签字
  if (!signatureImage.value || !signatureImage1.value) {
    ElMessage.error('請簽名')
    return
  }
  // 判断是否勾选

  if (!checked.value) {
    ElMessage.error('請閱讀並同意聲明書')
    return
  }

  const confirmAction = await ElMessageBox.confirm('是否確認提交數據', '', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '是',
    cancelButtonText: '取消'
  })

  if (confirmAction !== 'confirm') {
    return // 如果取消则退出函数
  }
  const form = {
    hash: '',
    name: '',
    DocumentNumber: '',
    Mobile: '',
    Business: '',
    Amount: '',
    SourceOfFundsValue: '',
    UseOfExpensesValue: '',
    officialValue: '',
    MailingAddress: '',
    WalletAddress: ''
  }

  const pdfContent = document.getElementById('pdf-content')
  const pdfContent1 = document.getElementById('pdf-content1')

  if (pdfContent && pdfContent1) {
    try {
      // 开始加载动画
      loading.value = true
      // 使用 html2canvas 将第一页的内容转换为 Canvas
      const canvas1 = await html2canvas(pdfContent, {
        scale: 4, // 放大倍数，根据需要调整
        useCORS: true // 允许跨域使用图片
      })
      const canvas2 = await html2canvas(pdfContent1, {
        scale: 4, // 放大倍数，根据需要调整
        useCORS: true // 允许跨域使用图片
      })

      // 使用 html2canvas 将指定的 DOM 元素转换为 Canvas
      // const canvas = await html2canvas(pdfContent)
      // const canvas3 = await html2canvas(pdfContent1)

      // 将 Canvas 转换为 PNG 格式的数据 URL
      // const imgData = canvas.toDataURL('image/png')

      // 创建新的 jsPDF 实例
      const pdf = new jsPDF({
        orientation: 'p', // 页面方向：'p' 纵向，'l' 横向
        unit: 'mm', // 单位：'mm' 毫米，'pt' 点，'in' 英寸
        format: [300, 1000] // 自定义尺寸，单位为指定的单位（这里是毫米） // 页面格式：'a0' - 'a10', 'b0' - 'b10', 'letter', 'legal', 'ledger', 'tabloid'
      })

      // 获取 PDF 页面的宽度和高度
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // 添加第一页的内容
      pdf.addImage(
        canvas1.toDataURL('image/png'),
        'PNG',
        10,
        10,
        pdfWidth - 20,
        pdfHeight - 15
      )

      pdf.setFontSize(12)

      // 添加新页
      pdf.addPage()

      // 添加第二页的内容（假设已经有第二页的 Canvas 对象）
      pdf.addImage(
        canvas2.toDataURL('image/png'),
        'PNG',
        10,
        10,
        pdfWidth - 20,
        pdfHeight - 100
      )
      // 提供下载预览功能
      pdf.save('document.pdf')

      // 将 PDF 输出为 Blob 对象
      const pdfBlob = pdf.output('blob')

      // 创建 FormData 对象并添加 PDF 文件
      const formData = new FormData()
      formData.append(`${formRequest.hash}_pdf`, pdfBlob)

      // 发送 POST 请求，将 PDF 上传到服务器
      const response = await uploadImage(formData, 'multipart/form-data')
      if (response.data.code !== 0) {
        ElMessage.error('文件上傳失敗')
        return
      }
      //发请求
      console.log('formRequest', formRequest)

      const res = await FormUpload(formRequest)
      if (res.data.code !== 0) {
        if (res.data.json.msg_en === 'error transaction') {
          ElMessage.error('已提交過表單')
          useFormStore().setFormData(form)
          useImageStore().clearImages()
          useImageStore().clearDeclarationVideo()
          //跳转回首页
          router.push('/')
        }
        ElMessage.error('文件上傳失敗')
        return
      }
      // 上传成功后的处理
      ElMessage.success('文件上傳成功')
      // 结束加载动画
      loading.value = false
      await ElMessageBox.alert('信息提交已完成，確認後將刷新頁面', '', {
        // if you want to disable its autofocus

        confirmButtonText: '確認'
      })
      useFormStore().setFormData(form)
      useImageStore().clearImages()
      useImageStore().clearDeclarationVideo()
      //跳转回首页
      router.push('/')
    } catch (error) {
      // 处理上传失败的情况
      console.error('文件上传失败', error)
      ElMessage.error('文件上傳失敗')
      // 结束加载动画
      loading.value = false
    } finally {
      // 结束加载动画
      loading.value = false
    }
  } else {
    // 结束加载动画
    loading.value = false
    ElMessage.error('未找到 PDF 內容')
  }
}
</script>

<style scoped lang="less">
.texs {
  border-bottom: 2px solid #000;
}

.SubmissionOfDeclaration {
  margin-top: 40px;
  width: 160px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: red;
  color: #fff;
}

.home_view {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000000;
  width: 100%;
  flex-shrink: 0;

  .TradingDisclaime {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 97vw;
  }

  .TradingDisclaime_title {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .F-500-000 {
    font-size: 18px;
    font-weight: 500;
  }

  .F-400-16 {
    font-size: 15px;
    line-height: 20px;
  }

  .TradingDisclaimeOne,
  .TradingDisclaimeTwo {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .TradingDisclaimeTwo {
    margin-top: 50px;
  }

  .SignatureIDCard {
    margin-top: 20px;
    line-height: 24px;
  }

  .bigCard {
    width: 100%;
    border: 2px solid #000;

    .CardTitle {
      font-size: 20px;
      text-align: center;
      font-weight: 700;
      margin-top: 13px;
    }

    .text_content1 {
      font-size: 15px;
      line-height: 22px;
      width: 100%;
      border-bottom: 2px solid #000;
      padding: 10px;
    }

    .overbold {
      font-weight: 500;
    }

    .SignatureArea {
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;

      .PleaseSign {
        font-size: 35px;
        color: #0000006b;
      }
    }
  }
}

.signature-display {
  text-align: center;
}

.signature-img {
  /* border: 1px solid #000; */
  border-radius: 6px;
  width: 150px;
  height: 30px;
}

.signature {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background: #fcd4d4;
  color: #0000008d;
}

.ConsentClause {
  margin-top: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
}

.RepublicOfChina {
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  gap: 2px;
}

:deep(.el-checkbox__label) {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: black !important;
}

:deep(.el-checkbox__inner) {
  width: 16px !important;
  height: 16px !important;
  border: 1px solid #000 !important;
  background: #fff !important;
}

:deep(.el-checkbox__inner::after) {
  width: 4px !important;
  height: 8px !important;
  left: 5px !important;
  top: 1px !important;
  border-color: red !important;
}

.Q_signature {
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  height: 45px;
  font-size: 14px;
  font-weight: 400;
  color: #0000006c;
  line-height: 14px;
  border-bottom: 2px solid #000;
}
</style>
