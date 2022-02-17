const i18next = jest.createMockFromModule('i18next');
i18next.t = (k) => k;
i18next.use = () => i18next;
i18next.init = () => i18next;
i18next.language = 'en';

module.exports = i18next;
