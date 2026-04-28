import React, { useState, useEffect, useMemo, useRef, useId, useCallback } from 'react';
import * as ChromiumUI from 'chromium-ui-react';
import * as Icons from './icons';

const ReactLiveScope: any = {
  React,
  useState,
  useEffect,
  useMemo,
  useRef,
  useId,
  useCallback,
  ...ChromiumUI,
  ...Icons,
};

export default ReactLiveScope;
