// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let startService = document.getElementById('startService');

startService.onclick = function(element) {
    //document.getElementById('myVideo').addEventListener('ended', myHandler, false);
    chrome.tabs.query({ active: true }, function(tab) {
        chrome.tabs.remove(tab[0].id);
	});
};
