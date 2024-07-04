import { defineStore } from 'pinia'

interface RuleForm {
    hush: string;
    name: string;
    DocumentNumber: string;
    Mobile: string;
    Business: string;
    Amount: string;
    SourceOfFundsValue: string;
    UseOfExpensesValue: string;
    officialValue: string;
    MailingAddress: string;
    WalletAddress: string;
}

const useFormStore = defineStore('formStore', {
    state: () => ({
        form: {
            hush: '',
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
        } as RuleForm
    }),
    actions: {
        setFormData(newForm: RuleForm) {
            this.form = newForm
        }
    }
})

export default useFormStore