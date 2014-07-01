/**
 * @fileOverview Requirejs module containing base antie.devices.logging.onscreen class.
 *
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

// Saves the logs for access later
require.def(
	'antie/devices/logging/saving',
	[
		'module', 'antie/devices/device', 'antie/application'
	],
	function( Module, Device, Application)
	{

		window.antie.logItems = [];

		var saveData = function (type, data) {
			var joinedData = Array.prototype.join.call(data, ' -|- ');
			window.antie.logItems.push({ 'level': type, 'message': joinedData })
		};

		Application.prototype.getLogItems = function () {
			var data = window.antie.logItems;
			window.antie.logItems = [];
			return data;
		}

		var loggingMethods = {
			log: function() {
					saveData.call(this, "LOG", arguments);
			},
			debug: function() {
				saveData.call(this, "DEBUG", arguments);
			},
			info: function() {
				saveData.call(this, "INFO", arguments);
			},
			warn: function() {
				saveData.call(this, "WARN", arguments);
			},
			error: function() {
				saveData.call(this, "ERROR", arguments);
			}
		};

		Device.addLoggingStrategy( Module.id, loggingMethods );
	}
);
