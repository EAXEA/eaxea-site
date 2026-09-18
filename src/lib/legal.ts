// Veri sorumlusu kimliği. KVKK aydınlatma metni ve footer bu değerleri okur.
//
// KAYNAK: MAIA'S WORKS faturalarını Maiamari işletmesi üzerinden keser, bu
// yüzden veri sorumlusu maiamari.art ile aynıdır. Asıl kayıt
// `maiamari-studio/lib/legal.ts` (SELLER) içindedir; oradaki adres veya unvan
// değişirse burası da elle güncellenir. Telefon ve vergi bilgisi bilerek yok:
// e-ticaret olmadığı için 6502 zorunluluğu doğmaz, KVKK m.10 için gerekmez.
export const CONTROLLER = {
  legalName: "Fatma Duygu Sinan Şenocak",
  tradeName: "Maiamari Baskı Atölyesi",
  formType: "Şahıs işletmesi",
  address: "Küçükesat, Bülbülderesi Cd. No:90 D:B, 06660 Çankaya / Ankara",
  // Başvurular sitenin iletişim adresine gider; aynı Workspace kutusuna düşer.
  email: "cihan@maiamari.art",
} as const;

export const LEGAL_UPDATED = "18 Eylül 2026";
