import { NativeBaseProvider } from 'native-base';
import React, { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/react-native';

global.React = React;

type Options = Parameters<typeof render>[1];

const AllProviders = ({ children }: { children: ReactNode }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      {children}
    </NativeBaseProvider>
  );
};

const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
