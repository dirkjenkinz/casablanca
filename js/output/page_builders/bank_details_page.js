'use strict'
const { buildOptions, buildHeader } = require("./page_utilities");

const buildBankDetailsObject = (pageName, field) => {
    let tag = field.tag;

    let bankDetailsObject = `{{ form.text(
            formData.accountHolderName,
            'accountHolderName',
            t('${tag}:bankAccount.accountHolderName.label'),
            options = {
                trim: true,
                maxlength: 60
            },
            errors=formErrors)
        }}

        {{ form.text(
            formData.bankName,
            'bankName',
            t('${tag}:bankAccount.bankName.label'),
            options = {
                trim: true,
                maxlength: 60
            },
            errors=formErrors)
        }}

        {{ sortCode.cadsSortCode(
            formData.sortCode,
            'sortCode',
            t('${tag}:bankAccount.sortCode.label'),
            errors=formErrors)
        }}

        {{ form.text(
            formData.accountNumber,
            'accountNumber',
            t('${tag}:bankAccount.accountNumber.label'),
            options = {
                trim: true,
                maxlength: 10
            },
            errors=formErrors)
        }}

        <div class="accordion">
            <p class="accordion-title title-mini" accordion-track="{{ accordionTrack }}">{{ t('${tag}:bankAccount.postOfficeCard.link') }}</p>
            <div class="accordion-content panel panel-border-narrow">
                <p>{{ t('${tag}:bankAccount.postOfficeCard.messageText1') }} <br />
                    {{ t('${tag}:bankAccount.postOfficeCard.messageText2') }}</p>
            </div>
        </div>

        {{ form.text(
            formData.rollNumber,
            'rollNumber',
            t('${tag}:bankAccount.rollNumber.label'),
            options = {
                trim: true,
                maxlength: 18
            },
            errors=formErrors)
        }}\n\n`

    return bankDetailsObject;
}

module.exports = buildBankDetailsObject;