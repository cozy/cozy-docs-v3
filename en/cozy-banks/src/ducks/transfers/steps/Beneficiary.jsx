import React from 'react'
import Padded from 'components/Spacing/Padded'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Text, Caption, Bold } from 'cozy-ui/transpiled/react/Text'
import Button from 'cozy-ui/transpiled/react/Button'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import AddAccountButton from 'ducks/categories/AddAccountButton'
import { List, Row } from 'components/List'
import PageTitle from 'components/Title/PageTitle'
import Figure from 'cozy-ui/transpiled/react/Figure'
import AccountIcon from 'components/AccountIcon'

import Title from './Title'

const _BeneficiaryRow = ({ beneficiary, onSelect }) => {
  return (
    <Row className="u-clickable" onClick={onSelect.bind(null, beneficiary)}>
      <Media className="u-w-100">
        {beneficiary.account ? (
          <Img className="u-mr-1">
            {/* TODO, remove key when AccountIcon correctly updates on account change (https://github.com/cozy/cozy-ui/issues/1076) */}
            <AccountIcon
              key={beneficiary.account._id}
              account={beneficiary.account}
            />
          </Img>
        ) : null}
        <Bd>
          <Text>{beneficiary.label}</Text>
          <Caption>{beneficiary.iban}</Caption>
        </Bd>
        {beneficiary.account ? (
          <Img className="u-ml-half">
            <Bold>
              <Figure
                symbol="€"
                total={beneficiary.account.balance}
                coloredPositive
                coloredNegative
                coloredWarning
              />
            </Bold>
          </Img>
        ) : null}
      </Media>
    </Row>
  )
}

const BeneficiaryRow = React.memo(_BeneficiaryRow)

class ChooseBeneficiary extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { showAddBeneficiary: false }
    this.handleShowAddBeneficiary = this.handleShowAddBeneficiary.bind(this)
    this.handleCloseAddBeneficiary = this.handleCloseAddBeneficiary.bind(this)
  }

  handleShowAddBeneficiary() {
    this.setState({ showAddBeneficiary: true })
  }

  handleCloseAddBeneficiary() {
    this.setState({ showAddBeneficiary: false })
  }

  render() {
    const { t, beneficiaries, onSelect, active, category } = this.props
    return (
      <>
        <Padded>
          {active && (
            <PageTitle>{t('Transfer.beneficiary.page-title')}</PageTitle>
          )}
          <Title>{t('Transfer.beneficiary.title')}</Title>
          <Padded.Unpadded horizontal>
            <List border="horizontal" className="u-mb-1">
              {beneficiaries.map(beneficiary => (
                <BeneficiaryRow
                  key={beneficiary._id}
                  onSelect={onSelect}
                  beneficiary={beneficiary}
                />
              ))}
            </List>
          </Padded.Unpadded>
          <div className="u-ta-center">
            {category === 'internal' ? (
              <AddAccountButton
                label={t('Transfer.no-bank.add-bank')}
                theme="primary"
                className="u-mt-0"
              />
            ) : (
              <Button
                onClick={this.handleShowAddBeneficiary}
                theme="primary"
                label={t('Transfer.beneficiary.add-beneficiary')}
              />
            )}
          </div>
        </Padded>
        {this.state.showAddBeneficiary ? (
          <Dialog
            open
            title={t('Transfer.beneficiary.help-add-beneficiary-title')}
            content={t('Transfer.beneficiary.help-add-beneficiary')}
            onClose={this.handleCloseAddBeneficiary}
            actions={
              <Button
                onClick={this.handleCloseAddBeneficiary}
                theme="primary"
                label={t('Transfer.beneficiary.help-add-beneficiary-action')}
              />
            }
          />
        ) : null}
      </>
    )
  }
}

export default React.memo(translate()(ChooseBeneficiary))
