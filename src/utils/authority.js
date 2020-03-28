import _ from 'lodash';
import Cookies from 'js-cookie';
// import { createAvatar } from './common';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('access-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['guest'];
}

export function getRole() {
  const roles = getAuthority();
  if (roles && roles[0]) return roles[0];
  return roles;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('access-authority', JSON.stringify(proAuthority));
}

export function getAccessToken() {
  // return Cookies.get('ob_cl_token');
  return localStorage.getItem('access-token');
}

export function setAccessToken(token) {
  return localStorage.setItem('access-token', token);
}

export function getRefreshToken() {
  return localStorage.getItem('access-refresh');
}

export function setRefreshToken(token) {
  return localStorage.setItem('access-refresh', token);
}

export function getCurrentUserEmail() {
  return localStorage.getItem('access-email');
}

export function setCurrentUserEmail(email) {
  return localStorage.setItem('access-email', email);
}

export function getCurrentLang() {
  return localStorage.getItem('access-lang') || 'vi';
}

export function setCurrentLang(lang) {
  return localStorage.setItem('access-lang', lang);
}

export function getAvatar() {
  return localStorage.getItem('access-avatar') || '';
}

export function setAvatar(avatar) {
  return localStorage.setItem('access-avatar', avatar);
}

export function getUserDetail() {
  return JSON.parse(localStorage.getItem('ob_cl_userDetail')) || "";
}

export function forceLogout() {
  localStorage.removeItem('ob_cl_userDetail');
  localStorage.removeItem('ob_cl_userInfo');
  localStorage.removeItem('ob_cl_userType');
  Cookies.remove('ob_cl_token');
  return window.location.reload()
}

