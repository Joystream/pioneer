import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SimpleSelect } from '@/common/components/selects'
import { Locale } from '@/services/i18n'

const locales: Locale[] = ['en', 'ru']

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation()
  const [currentLng, setCurrentLng] = useState<Locale>(i18n.resolvedLanguage as Locale)

  const onLangChange = useCallback((lng: Locale | null) => {
    lng && i18n.changeLanguage(lng, (err) => !err && setCurrentLng(lng))
  }, [])

  const renderItem = (selected: Locale) => t(`languages.${selected}`)

  return (
    <SimpleSelect
      title={t('languages.title')}
      options={locales}
      value={currentLng}
      onChange={onLangChange}
      renderSelected={renderItem}
      renderOption={renderItem}
      selectSize="l"
    />
  )
}
