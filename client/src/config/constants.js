export const BUTTON_TYPES = {
    primary: 'primary',
    link: 'link',
};

export const DRAWER_SIDE = {
    left: 'left',
    right: 'right',
};

export const TOOLTIP_SIDE = {
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
};

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export const MESSAGE_TYPE = {
    success: 'success',
    warning: 'warning',
    error: 'error',
};

export const SPINNER_SIZES = {
    small: 'small',
    medium: 'medium',
    large: 'large',
};

export const ROUTES = {
    login: {
        path: '/login',
    },
    register: {
        path: '/register',
    },
    resetPassword: {
        path: '/reset-password',
    },
    settings: {
        path: '/app/settings',
    },
    accountSettings: {
        path: '/app/settings/account',
    },
    securitySettings: {
        path: '/app/settings/security',
    },
    telegramSettings: {
        path: '/app/settings/telegram',
    },
    configurations: {
        path: '/app/trade/configurations',
    },
    history: {
        path: '/app/trade/history',
    },
};

export const ERROR_MESSAGES = {
    defaultError: 'Something went wrong. Please try again later.',
};

export const SIGNAL_TYPES = {
    all: 1,
    buy: 2,
    sell: 3,
};

export const TRADE_MODES = {
    spot: 1,
    future: 2,
};

export const TRADE_STATUSES = {
    open: 1,
    closed: 2,
};
