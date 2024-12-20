import mongoose from 'mongoose';

export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return false;
  }
  const regex = /^[a-zA-Z\u0400-\u04FF0-9\s]+$/;
  return regex.test(name);
};

export const validateId = (id) => {
  return Number.isInteger(id) && id >= 0;
};

export const validateAmount = (value) => {
  return value > 0;
};

export const validateDate = (value) => {
  return value instanceof Date && !isNaN(value);
};

export const validateCode = (code) => {
  const regex = /^[a-z]{3}$/;
  return regex.test(code);
};

export const validateSymbol = (symbol) => {
  return typeof symbol === 'string' && symbol.length === 1;
};
export const validateCurrency = async (value) => {
  const currency = await mongoose.model('Currency').findOne({ code: value });
  return !!currency;
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // минимум 8 символов, хотя бы 1 буква и 1 цифра
  return regex.test(password);
};
