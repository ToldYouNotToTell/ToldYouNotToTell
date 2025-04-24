"use client";

import React, { useState } from "react";
import SearchBar from "@/components/header/SearchBar";
import NavMenu from "@/components/header/NavMenu";
import AddPostButton from "@/components/ui/buttons/AddPostButton";
import PhantomButton from "@/components/ui/buttons/PhantomButton";
import PresaleButton from "@/components/ui/buttons/PresaleButton";
import NavToggleButton from "@/components/ui/buttons/NavToggleButton";
import ThemeToggleButton from "@/components/ui/buttons/ThemeToggleButton";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((o) => !o);
  };

  return (
    <div className="header-bar">
      <div className="logo">ToldYouNotToTell</div>
      
      {/* Поле поиска */}
      <SearchBar onSearch={function (query: string): void {
        throw new Error("Function not implemented.");
      } } />
      
      {/* Кнопка нового поста */}
      <AddPostButton onClick={() => {/* TODO: показать форму */}} />
      
      {/* Кнопка Phantom Wallet */}
      <PhantomButton />
      
      {/* Кнопка Presale */}
      <PresaleButton />
      
      {/* Кнопка открытия меню навигации */}
      <NavToggleButton onClick={toggleNav} />
      
      {/* Кнопка переключения темы */}
      <ThemeToggleButton />
      
      {/* Выдвижное меню */}
      {navOpen && <NavMenu visible={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } onMyPosts={function (): void {
        throw new Error("Function not implemented.");
      } } onCurrentBoosts={function (): void {
        throw new Error("Function not implemented.");
      } } onMyRewards={function (): void {
        throw new Error("Function not implemented.");
      } } onPromotion={function (): void {
        throw new Error("Function not implemented.");
      } } onFAQ={function (): void {
        throw new Error("Function not implemented.");
      } } onModeratorPanel={function (): void {
        throw new Error("Function not implemented.");
      } } />}
    </div>
  );
}