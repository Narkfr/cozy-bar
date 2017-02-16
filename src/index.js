'use strict'

import i18n from './lib/i18n'
import stack from './lib/stack'

import BarView from './components/Bar'

const createElement = function CozyBarCreateElement () {
  const barNode = document.createElement('div')
  barNode.setAttribute('id', 'coz-bar')
  barNode.setAttribute('role', 'banner')

  return barNode
}

const injectDOM = function CozyBarInjectDOM (data) {
  if (document.getElementById('coz-bar') !== null) { return }

  require('./styles/index.css')

  const barNode = createElement()
  const appNode = document.querySelector('[role=application]')
  document.body.insertBefore(barNode, appNode)

  return new BarView({
    target: barNode,
    data
  })
}

const bindEvents = function CozyBarBindEvents () {
  this._clickOutsideListener = () => this.fire('clickOutside')
  document.body.addEventListener('click', this._clickOutsideListener)
}

const unbindEvents = function CozyBarUnbindEvents () {
  document.body.removeEventListener('click', this._clickOutsideListener)
}

const getDefaultStackURL = function GetDefaultCozyURL () {
  return document.querySelector('[role=application]').dataset.cozyDomain
}

const getDefaultLang = function GetDefaultLang () {
  return document.documentElement.getAttribute('lang') || 'en'
}

const getDefaultIcon = function GetDefaultIcon () {
  const linkNode = document.querySelector('link[rel="icon"][sizes^="32"]')
  if (linkNode !== null) {
    return linkNode.getAttribute('href')
  } else {
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
}

const init = function CozyBarInit ({
  lang = getDefaultLang(),
  appName,
  iconPath = getDefaultIcon(),
  cozyURL = getDefaultStackURL()
} = {}) {
  i18n(lang)
  stack.init({cozyURL})
  const view = injectDOM({lang, appName, iconPath})
  bindEvents.call(view)
  view.on('teardown', unbindEvents.bind(view))
}

module.exports = { init }
