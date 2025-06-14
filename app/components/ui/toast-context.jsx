"use client"
import React, { createContext, useState } from "react";
import { ToastProvider, Toast, ToastViewport, ToastTitle, ToastDescription } from "./toast";

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      <ToastProvider>
        {children}
        {toasts.map(({ id, title, description, action, ...props }) => (
          <Toast key={id} id={id} {...props}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
            {action}
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
};

export default ToastContext;