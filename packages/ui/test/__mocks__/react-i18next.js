/* eslint-disable */
const reactI18Next = jest.createMockFromModule('react-i18next');

reactI18Next.useTranslation = () => {
  return {
    t: (str) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

module.exports = reactI18Next;
