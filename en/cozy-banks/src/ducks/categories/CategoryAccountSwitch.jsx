import React, { Fragment } from 'react'
import { AccountSwitch } from 'ducks/account'
import BackButton from 'components/BackButton'

const CategoryAccountSwitch = ({ selectedCategory, breadcrumbItems }) => {
  const [previousItem] = breadcrumbItems.slice(-2, 1)
  return (
    <Fragment>
      <AccountSwitch small={selectedCategory !== undefined} />
      {selectedCategory && (
        <BackButton
          onClick={
            previousItem && previousItem.onClick
              ? previousItem.onClick
              : undefined
          }
          theme="primary"
        />
      )}
    </Fragment>
  )
}

export default CategoryAccountSwitch
