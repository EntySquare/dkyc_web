import { defineStore } from 'pinia'

interface RuleForm {
    hash: string;
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
        } as RuleForm
    }),
    actions: {
        setFormData(newForm: RuleForm) {
            this.form = newForm
        }
    }
})

export default useFormStore
