export type UnavConfig = {
  target: HTMLElement;
  env: 'stage' | 'prod';
  analyticsContext: AnalyticsContext;
  theme: 'light' | 'dark';
  locale: string;
  countryCode: string;
  children: UnavChildren;
  imsClientId: string;
  isSectionDividerRequired?: boolean;
  clientAppName?: string;
  mode?: string;
};


type UnavChildren = UnavComponent[];

type UnavComponent
  = AppSwitcher
  | Help
  | Profile
  | Notifications
  | Cart
  | Jarvis;

type AppSwitcher = {
  name: 'app-switcher';
  attributes: unknown;
};

type Profile = {
  name: 'profile';
  attributes: {
    isSignUpRequired: boolean;
    messageEventListener: (_: CustomEventInit<AccountMenuEventDetail>) => void;
    callbacks: {
      onSignIn: () => void;
      onSignUp: () => void;
    };
    componentLoaderConfig: {
      config: {
        enableLocalSection: boolean;
        enableProfileSwitcher: boolean;
        miniAppContext: {
          logger: {
            trace: (_: string) => void;
            debug: (_: string) => void;
            info: (_: string) => void;
            warn: (_: string) => void
            error: (_: string) => void;
          };
        };
      };
    };
  };
};

type AccountMenuEventDetail = {
  name: string;
  payload: { subType: 'AppInitiated' | 'SignOut' | 'ProfileSwitch' };
  executeDefaultAction: () => Promise<unknown>;
};

type Notifications = {
  name: 'notifications';
  attributes: {
    notificationsConfig: {
      applicationContext: {
        appID: string;
        hostCallBackFn?: () => void;
      };
    };
  };
}

type Help = {
  name: 'help';
  attributes: {
    children: HelpItem[]
  }
};

type HelpItem
  = { type: 'Support'; }
  | { type: 'Community'; }
  | { type: 'Jarvis'; }
  | {
      title: string;
      onAction?: () => void;
      analyticsIdentifier: string;
    }

type AnalyticsContext = {
  disableEvents?: boolean;
  consumer: {
    name: string;
    version: string;
    platform: 'Web' | 'Desktop' | 'Mobile';
    app_store_id?: string;
    device: 'macOS' | 'windows' | 'linux' | 'chromeOS' | 'android' | 'iOS' | 'iPadOS' | 'na';
    os_version: string;
  };
  event: {
    visitor_guid: string;
  };
};

type Cart = {
  name: 'cart';
}

type Jarvis = {
  name: 'jarvis';
  attributes: {
    appid: string;
    callbacks: unknown;
  };
};
