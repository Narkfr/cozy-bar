import React from 'react'
import { translate } from '../lib/I18n'

const StorageData = ({ t, data }) => {
  const diskQuota = Number.isInteger(data.quota)
    ? (data.quota / (1024 * 1024 * 1024)).toFixed(2)
    : data.quota
  const diskUsage = Number.isInteger(data.usage)
    ? (data.usage / (1024 * 1024 * 1024)).toFixed(2)
    : data.usage
  return (
    <div className='coz-nav-storage'>
      <p className='coz-nav-storage-text'>
        {t('storage_phrase', {
          diskUsage,
          diskQuota
        })}
      </p>
      <progress
        className='cozy-nav-storage-bar'
        value={diskUsage} max={diskQuota} min='0'
      />
    </div>
  )
}

export default translate()(StorageData)
