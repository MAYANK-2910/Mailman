import { GmailRoute } from './routeManager';

export type Capability = 'enhanced' | 'native' | 'hybrid' | 'disabled';

export interface RouteCapability {
  mode: Capability;
  showMailman: boolean;
  hideNativeInbox: boolean;
}

const CAPABILITIES: Record<GmailRoute, RouteCapability> = {
  inbox: { mode: 'enhanced', showMailman: true, hideNativeInbox: true },
  label: { mode: 'enhanced', showMailman: true, hideNativeInbox: true },
  search: { mode: 'hybrid', showMailman: true, hideNativeInbox: false },
  thread: { mode: 'native', showMailman: false, hideNativeInbox: false },
  settings: { mode: 'disabled', showMailman: false, hideNativeInbox: false },
  unknown: { mode: 'native', showMailman: false, hideNativeInbox: false },
};

export function getCapability(route: GmailRoute): RouteCapability {
  return CAPABILITIES[route] || CAPABILITIES.unknown;
}
