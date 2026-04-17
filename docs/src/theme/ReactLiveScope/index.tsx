import React, { useState, useEffect, useMemo, useRef, useId, useCallback } from 'react';
import * as ChromiumUI from 'chromium-ui-react';

const ReactLiveScope: any = {
  React,
  useState,
  useEffect,
  useMemo,
  useRef,
  useId,
  useCallback,
  ...ChromiumUI,
};

export default ReactLiveScope;
