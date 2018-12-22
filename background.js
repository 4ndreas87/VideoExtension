// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
	return;
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({'url': "https://www.youtube.com/watch?reload=9&v=1vDZsABHUbQ"
    });
});