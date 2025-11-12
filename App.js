import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Clipboard } from 'react-native';

const FlagSelectionScreen = ({ onLanguageSelect }) => {
  return (
    <View style={styles.flagContainer}>
      <Text style={styles.flagTitle}>Dil Seçin / Select Language</Text>
      
      <TouchableOpacity 
        style={styles.flagButton}
        onPress={() => onLanguageSelect('turkish')}
      >
        <Text style={styles.flag}>🇹🇷</Text>
        <Text style={styles.flagText}>Türkçe</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.flagButton}
        onPress={() => onLanguageSelect('english')}
      >
        <Text style={styles.flag}>🇬🇧</Text>
        <Text style={styles.flagText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.flagButton}
        onPress={() => onLanguageSelect('french')}
      >
        <Text style={styles.flag}>🇫🇷</Text>
        <Text style={styles.flagText}>Français</Text>
      </TouchableOpacity>
    </View>
  );
};

const ElevatorSettingsScreen = ({ onBack, initialLanguage }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedSubSections, setExpandedSubSections] = useState({});
  const [copiedItem, setCopiedItem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage || 'turkish');

  // TÜRKÇE DATA - MEVCUT YAPINIZ (kısaltılmış)
  const dataTurkish = [
     
    {
      id: '1',
      title: '1: HIZLI KURULUM',
      subSections: [
        {
          id: '1-1', title: 'CALISMA MODU',
          items: ['- KURULUMCU MODU REVIZYON BAGLANTISIZ (Default)', '- KURULUMCU MODU REVIZYON BAGLANTILI', '- NORMAL CALISMA']
        },
        {
          id: '1-2', title: 'MOTOR TIPI',
          items: ['- ASENKRON  (Default)', '- SENKRON']
        },
        {
          id: '1-3', title: 'MOTOR KONTROL TIPI',
          items: ['- ACIK CEVRIM  (Default)', '- KAPALI CEVRIM']
        },
        {
          id: '1-4', title: 'NOMINAL KABIN HIZI',
          items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
        },
        {
          id: '1-5', title: 'MOTOR DEVRI',
          items: ['[ 10 , 3000 ] Default: 1400 RPM']
        },
       {
          id: '1-6', title: 'MOTOR FREKANSI',
          items: ['[ 1.00 , 200.00 ] Default: 50.00 Hz']
        },
        {
          id: '1-7', title: 'MOTOR AKIMI',
          items: ['[ 2.50 , 50.00 ] Default: 10.00 Amper']
        },
        {
          id: '1-8', title: 'MOTOR VOLTAJI',
          items: ['[ 150 , 500 ] Default: 380 VOLT']
        },
        {
          id: '1-9', title: 'ENKODER TIPI',
          items: ['- ENDAT-SIN COS 2048  (Default)', '- SSI GRAY-SINCOS 2048', '- SSI GRAY-SINCOS 1024', '- BISS BINARY SINCOS 2048', '- BISS GRAY SINCOS 2048', '- SINCOS 2048 SINCOS 2048']
        },
        {
          id: '1-10', title: 'MOTOR YONU',
          items: ['- SAAT YONU  (Default)', '- SAAT YONUNUN TERSI']
        },
        {
          id: '1-11', title: 'YUKSEK HIZ [VMAX]',
          items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
        },
        {
          id: '1-12', title: 'KUYU POZISYON SISTEMI',
          items: ['- ML1-ML2 SAYICILI  (Default)', '- ENKODER']
        },
        {
          id: '1-13', title: 'DURAK SAYISI',
          items: ['[ 2 , 16 ] Default: 16']
        },
        {
          id: '1-14', title: 'OTO-AYAR BASLAT',
          items: ['- HAYIR  (Default)', '- EVET']
        }
      ]
    },
   {
      id: '2',
      title: '2: TEMEL AYARLAR',
      subSections: [
        { id: '2-1', title: '2.1: LISAN/LANGUAGE', items: ['- TURKCE  (Default)', '- ENGLISH', '- ITALIANO', '- ESPANOL'] },
        { id: '2-2', title: '2.2: CALISMA MODU', items: ['- KURULUMCU MODU REVIZYON BAGLANTISIZ (Default)', '- KURULUMCU MODU REVIZYON BAGLANTILI', '- NORMAL CALISMA'] },
        { id: '2-3', title: '2.3: DURAK SAYISI', items: ['[ 2 , 16 ] Default: 16'] },
        { id: '2-4', title: '2.4: KUYU POZISYON SISTEMI', items: ['- ML1-ML2 SAYICILI  (Default)', '- ENKODER'] },
        { id: '2-5', title: '2.6A: KAT KASET TESISATI', items: ['- PARALEL TESISAT  (Default)', '- SERI TESISAT'] },
        { id: '2-6', title: '2.6B: KABIN KASET TESISATI', items: ['- PARALEL TESISAT  (Default)', '- SERI TESISAT'] },
        { id: '2-7', title: '2.7: TOPLAMA TIPI', items: ['- TEK BUTON TEK YON  (Default)', '- TEK BUTON CIFT YON', '- CIFT BUTON', '- TOPLAMASIZ BASIT KUMANDA', '- TOPLAMASIZ BASIT K. (KABIN ICI LIMITSIZ)'] },
        { id: '2-8', title: '2.8: KATTAN KATA AZAMI SEYIR SURESI', items: ['[ 5 , 45 ] Default: 45 Saniye'] },
        { id: '2-9', title: '2.9: KUYU DIBI REVIZYON TERMINALI', items: ['- YOK  (Default)', '- VAR'] },
        { id: '2-10', title: '2.10: HIZ REGULATORU BOBIN KONTROLU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-11', title: '2.11: KABIN LAMBASI SONME SURESI', items: ['[ 0 , 600 ] Default: 10 Saniye'] },
        { id: '2-12', title: '2.12: KABIN FANI KAPANMA SURESI', items: ['[ 0 , 600 ] Default: 60 Saniye'] },
        { id: '2-13', title: '2.13: PARK FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-14', title: '2.14: PARK DURAGI', items: ['[ 1 , 16 ] Default: 1'] },
        { id: '2-15', title: '2.15: PARK ZAMANI', items: ['[ 0 , 600 ] Default: 180 Saniye'] },
        { id: '2-16', title: '2.16A: YANGIN TAHLIYE FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-17', title: '2.16B: YANGIN SINYALI TIPI', items: ['- (NO) NORMALDE ACIK KONTAK  (Default)', '- (NC) NORMALDE KAPALI KONTAK'] },
        { id: '2-18', title: '2.16C: YANGIN SINYALI DURUMU', items: ['- KALICI DEGIL  (Default)', '- KALICI'] },
        { id: '2-19', title: '2.16D: YANGIN TAHLIYE SESLI ALARM UYARISI', items: ['- KAPALI  (Default)', '- REVIZYON MODUNDA IKEN AKTIF', '- GERIALMA MODUNDA IKEN AKTIF', '- REVIZYON / GERIALMA MODUNDA IKEN AKTIF', '- TAHLIYE DURAGINA KADAR SUREKLI', '- KAPI KAPANANA KADAR'] },
        { id: '2-20', title: '2.16E: YANGIN TAHLIYE DURAGINDA KAPILAR', items: ['- ACIK BEKLER  (Default)', '- KAPALI BEKLER', '- ACILIR VE KAPANIR'] },
        { id: '2-21', title: '2.17: ANA YANGIN TAHLIYE DURAGI', items: ['[ 1 , 16 ] Default: 1'] },
        { id: '2-22', title: '2.18: ALTERNATIF YANGIN DURAGI', items: ['[ 1 , 16 ] Default: 2'] },
        { id: '2-23', title: '2.19A: ITFAIYECI FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK (ANAHTAR KATTA)', '- ACIK (ANAHTAR KABINDE)'] },
        { id: '2-24', title: '2.19B: ITFAIYECI ANAHTARI TIPI', items: ['- (NO) NORMALDE ACIK KONTAK  (Default)', '- (NC) NORMALDE KAPALI KONTAK'] },
        { id: '2-25', title: '2.20: REVIZYON LIMITLERINDE', items: ['- HEMEN DUR  (Default)', '- BIR SONRAKI KAPI BOLGESINDE DUR', '- LIMITSIZ (SADECE GERIALMADA)'] },
        { id: '2-26', title: '2.21: GRUP KIMLIGI', items: ['- KONTROLCU-A  (Default)', '- KONTROLCU-B'] },
        { id: '2-27', title: '2.22: ALTTAN EKSIK DURAK SAYISI', items: ['[ 0 , 9 ] Default: 0'] },
        { id: '2-28', title: '2.23: USTTEN EKSIK DURAK SAYISI', items: ['[ 0 , 9 ] Default: 0'] },
        { id: '2-29', title: '2.24: PANIK TAHLIYE FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-30', title: '2.25: PANIK TAHLIYE DURAGI', items: ['[ 1 , 16 ] Default: 1'] },
        { id: '2-31', title: '2.26: GOREVLI SERVISI FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-32', title: '2.27: REVIZYONDAN CIKMA KOSULU', items: ['- REVIZYON ANAHTARI NORMALE ALINARAK  (Default)', '- REV. ANAHTARI NORMAL VE KAPI ACILARAK'] },
        { id: '2-33', title: '2.28: GRUPTAN AYRILMA SURESI', items: ['[ 5 , 300 ] Default: 30 Saniye'] },
        { id: '2-34', title: '2.29: SERI PORT FONKSIYONU', items: ['- KULLANILMIYOR  (Default)', '- ARLIFT', '- MODBUS SLAVE (UZAKTAN IZLEME)'] },
        { id: '2-35', title: '2.29A: SLAVE ADRESI', items: ['[ 1 , 247 ] Default: 32'] },
        { id: '2-36', title: '2.29B: ILETISIM HIZI', items: ['- 9600 BAUD  (Default)', '- 19200 BAUD'] },
        { id: '2-37', title: '2.29C: PARITY', items: ['- NONE  (Default)', '- ODD', '- EVEN'] },
        { id: '2-38', title: '2.29D: STOP BIT SAYISI', items: ['- 1-BIT  (Default)', '- 2-BITS'] },
        { id: '2-39', title: '2.29E: ARLIFT ILE MOTCUBE MENU ERISIMI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-40', title: '2.30: KUYUYA GIRIS KORUMASI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-41', title: '2.30B: BULUNULAN KATTA KAPI KONTROLU', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-42', title: '2.31: SEBEKE FREKANSI', items: ['- 50 Hz  (Default)', '- 60 Hz'] },
        { id: '2-43', title: '2.32: FAZ SIRASI KONTROLU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-44', title: '2.33: TEK FAZLI HIZI AZALTILMIS SERVIS', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-45', title: '2.34: KABIN KAYDINDAN VAZGECEBILME', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-46', title: '2.35: GUC KESILINCE POZISYONU SIFIRLA', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-47', title: '2.36: SIFRE', items: ['[ 0 , 999999 ] Default: 0'] },
        { id: '2-48', title: '2.37: LCD KONTRAST', items: ['[ 0 , 9 ] Default: 2'] },
        { id: '2-49', title: '2.38: KABIN FANI KONTROLU', items: ['- FAN BUTONU ILE  (Default)', '- OTOMATIK'] },
        { id: '2-50', title: '2.39: BAKIM SURESI KONTROLU', items: ['- YOK  (Default)', '- VAR'] },
        { id: '2-51', title: '2.40: BAKIM SURESI', items: ['01/01/2019 00:00'] },
        { id: '2-52', title: '2.41: YON DEGISTIRME SAYISI LIMITI', items: ['[ 0 , 9999999 ] Default: 0'] },
        { id: '2-53', title: '2.42: EMNIYET DEVRESI (120) KESILDIGINDE', items: ['- 120 GELDIGINDE CALISMAYA DEVAM EDER (Default)', '- ASANSOR BLOKE EDILIR', '- KABIN KOMUTU GELENE KADAR BLOKE OLUR'] },
        { id: '2-54', title: '2.43: GPTO ACIK SURESI', items: ['[ 1 , 9999999 ] Default: 1 Saniye'] },
        { id: '2-55', title: '2.44: GPTO KAPALI SURESI', items: ['[ 1 , 9999999 ] Default: 1 Saniye'] },
        { id: '2-56', title: '2.45: FOTOSEL ILE GEREKSIZ KAYIT IPTAL', items: ['- KAPALI  (Default)', '- UCUNCU SEFERDE IPTAL', '- DORDUNCU SEFERDE IPTAL', '- BESINCI SEFERDE IPTAL'] },
        { id: '2-57', title: '2.46: DEPREM SINYALI TIPI', items: ['- (NO) NORMALDE ACIK KONTAK  (Default)', '- (NC) NORMALDE KAPALI KONTAK'] },
        { id: '2-58', title: '2.47: KAPI ACIK TUTMA FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK (5 SANIYE KAPI AC BUTONUNA BASARAK)', '- ACIK (10 SANIYE KAPI AC BUTONUNA BASARAK)', '- ACIK (15 SANIYE KAPI AC BUTONUNA BASARAK)'] },
        { id: '2-59', title: '2.48: HIZ REG. BOBIN IZLEME KONTAKT TIPI', items: ['- (NO) NORMALDE ACIK KONTAK', '- (NC) NORMALDE KAPALI KONTAK  (Default)'] },
        { id: '2-60', title: '2.49A: KABIN KASETI BUTON SESI', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-61', title: '2.49B: KABIN KASETI KATTA UYARISI', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-62', title: '2.49C: KAT KASETLERI BUTON SESI', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-63', title: '2.49D: KAT KASETLERI KATTA UYARISI', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-64', title: '2.50: PARALEL TESISAT BUTON GIRIS TARAMASI', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '2-65', title: '2.51: HATA LISTESI ERISIMI', items: ['- HERKESE ACIK  (Default)', '- SADECE YETKILI KISI'] },
        { id: '2-66', title: '2.52: TERM.DURAKLARDA KABIN KAYITLARI SIL', items: ['- HAYIR  (Default)', '- EVET'] },
        { id: '2-67', title: '2.53: ERISIME ENGELLENECEK KATLAR', items: ['[ 0 , 65535 ] Default: 0'] },
        { id: '2-68', title: '2.54: KABIN CAGRISI ENGELLENECEK KATLAR', items: ['[ 0 , 65535 ] Default: 0'] },
        { id: '2-69', title: '2.55: CANBUS PROTOKOLU', items: ['- PROTOKOL ARKEL  (Default)', '- PROTOKOL OEM'] },
        { id: '2-70', title: '2.56: OOS AKTIF IKEN KAPININ DURUMU', items: ['- KAPALI BEKLER  (Default)', '- ACIK BEKLER'] },
        { id: '2-71', title: '2.57: UYKU MODUNA GIRME ZAMANI', items: ['- UYKU MODU KULLANILMIYOR  (Default)', '- KABIN LAMBASI SONDUGUNDE', '- KABIN LAMBASI SONDUKTEN 1 DK SONRA', '- KABIN LAMBASI SONDUKTEN 5 DK SONRA'] },
        { id: '2-72', title: '2.58: MESGUL SINYALI SONME SURESI', items: ['[ 1 , 60 ] Default: 5 Saniye'] },
        { id: '2-73', title: '2.59: LOP LEDLERINDEN MESGUL SINYALI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '2-74', title: '2.60: SERVIS DISI PARK DURAGI', items: ['[ 1 , 16 ] Default: 1'] }
      ]
    },
    {
      id: '3',
      title: '3: KUYU AYARLARI',
      subSections: [
        { id: '3-1', title: '3.1: KUYU OGRENME YAPILDI', items: ['- HAYIR  (Default)', '- EVET'] },
        { id: '3-2', title: '3.2: KAPI BOLGESI BAYRAK UZUNLUGU', items: ['[ 10.00 , 70.00 ] Default: 30.00 CM'] },
        { id: '3-3', title: '3.3: ML1 VE ML2 ARASINDAKI MESAFE', items: ['[ 5.00 , 10.00 ] Default: 5.00 CM'] },
        { id: '3-4', title: '3.10: 817 SINYAL POZISYONU', items: ['[ -100.00 , 20000.00 ] Default: 0.00 CM'] },
        { id: '3-5', title: '3.11: 818 SINYAL POZISYONU', items: ['[ -100.00 , 20000.00 ] Default: 0.00 CM'] }
      ]
    },
    {
      id: '4',
      title: '4: SEYAHAT HIZ EGRISI AYARLARI',
      subSections: [
        { id: '4-1', title: '4.1: YUKSEK HIZ [V_MAX]', items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s'] },
        { id: '4-2', title: '4.3: DUSUK HIZ [V_MIN]', items: ['[ 0.05 , 0.30 ] Default: 0.13 m/s'] },
        { id: '4-3', title: '4.4: REVIZYON HIZI [V_INSP]', items: ['[ 0.10 , 0.63 ] Default: 0.30 m/s'] },
        { id: '4-4', title: '4.5: GERI ALMA HIZI [V_RCL]', items: ['[ 0.10 , 0.30 ] Default: 0.30 m/s'] },
        { id: '4-5', title: '4.6: SEVIYELEME HIZI [V_RLVL]', items: ['[ 0.01 , 0.10 ] Default: 0.02 m/s'] },
        { id: '4-6', title: '4.7: YAVASLAMA MESAFESI [XSLW]', items: ['[ 10 , 500 ] Default: 150 CM'] },
        { id: '4-7', title: '4.8: DURMA MESAFESI [XSTP]', items: ['[ 1 , 50 ] Default: 7 CM'] },
        { id: '4-8', title: '4.9: KONFOR SEVIYESI', items: ['- KULLANICI TANIMLI', '- KONFOR:1 PERFORMANS:5', '- KONFOR:2 PERFORMANS:4', '- KONFOR:3 PERFORMANS:3  (Default)', '- KONFOR:4 PERFORMANS:2', '- KONFOR:5 PERFORMANS:1'] },
        { id: '4-9', title: '4.10: HIZLANMA IVMESI [PA]', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s2'] },
        { id: '4-10', title: '4.11: YAVASLAMA IVMESI [NA]', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s2'] },
        { id: '4-11', title: '4.12: RAMPA YUMUSATMA S1', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] },
        { id: '4-12', title: '4.13: RAMPA YUMUSATMA S2', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] },
        { id: '4-13', title: '4.14: RAMPA YUMUSATMA S3', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] },
        { id: '4-14', title: '4.15: RAMPA YUMUSATMA S4', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] }
      ]
    },
    {
      id: '5',
      title: '5: MOTOR PARAMETRELERI',
      subSections: [
        { id: '5-1', title: '5.1: MOTOR OTO-AYARI YAPILDI', items: ['- HAYIR  (Default)', '- EVET'] },
        { id: '5-2', title: '5.2: MOTOR TIPI', items: ['- ASENKRON  (Default)', '- SENKRON'] },
        { id: '5-3', title: '5.3: MOTOR KONTROL TIPI', items: ['- ACIK CEVRIM  (Default)', '- KAPALI CEVRIM'] },
        { id: '5-4', title: '5.4: NOMINAL KABIN HIZI', items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s'] },
        { id: '5-5', title: '5.5: MOTOR ENKODER TIPI', items: ['- ENDAT-SIN COS 2048  (Default)', '- SSI GRAY-SINCOS 2048', '- SSI GRAY-SINCOS 1024', '- BISS BINARY SINCOS 2048', '- BISS GRAY SINCOS 2048', '- SINCOS 2048 SINCOS 2048'] },
        { id: '5-6', title: '5.6: ENKODER COZUNURLUK', items: ['[ 100 , 9999 ] Default: 1024 DARBE/TUR'] },
        { id: '5-7', title: '5.7A: ENKODER YONU', items: ['- SAAT YONU  (Default)', '- SAAT YONUNUN TERSI'] },
        { id: '5-8', title: '5.7B: MOTOR YONU', items: ['- SAAT YONU  (Default)', '- SAAT YONUNUN TERSI'] },
        { id: '5-9', title: '5.8: ENKODER FILTRESI', items: ['[ 1 , 4 ] Default: 2'] },
        { id: '5-10', title: '5.9: ENKODER OFSET ACISI', items: ['[ 0 , 360 ] Default: 0'] },
        { id: '5-11', title: '5.10: MOTOR VOLTAJI', items: ['[ 150 , 500 ] Default: 380 VOLT'] },
        { id: '5-12', title: '5.11: MOTOR AKIMI', items: ['[ 2.50 , 50.00 ] Default: 10.00 Amper'] },
        { id: '5-13', title: '5.12: MOTOR FREKANSI', items: ['[ 1.00 , 200.00 ] Default: 50.00 Hz'] },
        { id: '5-14', title: '5.13: ROTOR KAYMA FREKANSI', items: ['[ 0.50 , 8.00 ] Default: 2.50 Hz'] },
        { id: '5-15', title: '5.14: MOTOR YUKSUZ AKIM', items: ['[ 20 , 60 ] Default: 40 %'] },
        { id: '5-16', title: '5.15: MOTOR ZAMAN SABITI', items: ['[ 50 , 500 ] Default: 250 ms'] },
        { id: '5-17', title: '5.16: MOTOR V/F ARA FREKANSI', items: ['[ 2.00 , 10.00 ] Default: 5.00 Hz'] },
        { id: '5-18', title: '5.17: MOTOR V/F ARA VOLTAJI', items: ['[ 5 , 100 ] Default: 40 VOLT'] },
        { id: '5-19', title: '5.18: MOTOR V/F MINIMUM FREKANSI', items: ['[ 0.50 , 10.00 ] Default: 0.50 Hz'] },
        { id: '5-20', title: '5.19: MOTOR V/F MINIMUM VOLTAJI', items: ['[ 5 , 100 ] Default: 10 VOLT'] },
        { id: '5-21', title: '5.20: MOTOR DEVRI', items: ['[ 10 , 3000 ] Default: 1400 RPM'] },
        { id: '5-22', title: '5.21: MEKANIK FREN ACILMA SURESI', items: ['[ 0.10 , 5.00 ] Default: 0.70 Saniye'] },
        { id: '5-23', title: '5.22: MEKANIK FREN KAPANMA SURESI', items: ['[ 0.10 , 5.00 ] Default: 0.80 Saniye'] },
        { id: '5-24', title: '5.23: MEKANIK FREN IZLEME', items: ['- KAPALI  (Default)', '- TEK GIRIS ILE IZLEME', '- IKI GIRIS ILE IZLEME'] },
        { id: '5-25', title: '5.24: PTC SICAKLIK IZLEME', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '5-26', title: '5.25: ROTOR KAYMA KOMPANZASYON YUZDESI', items: ['[ 0 , 400 ] Default: 100 %'] },
        { id: '5-27', title: '5.26: FRENDEN KURTARMA (CEKICLEME)', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '5-28', title: '5.27: MOTOR ENKODER ANALOG SINYAL KONTR.', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '5-29', title: '5.28: DUSUK KAYIPLI AN. GECIS SIC. ESIGI', items: ['[ 20 , 70 ] Default: 50 Derece(C)'] },
        { id: '5-30', title: '5.29: GERIALMADA DC FREN ILE MOTOR TESTI', items: ['- KAPALI  (Default)', '- ACIK (OTOMATIK)', '- ACIK (KULLANICI TANIMLI)'] },
        { id: '5-31', title: '5.30: DC FRENLEME YUZDESI', items: ['[ 0 , 100 ] Default: 50 %'] },
        { id: '5-32', title: '5.31: COGGING KOMPANZASYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '5-33', title: '5.32: COGGING OFFSET ACISI', items: ['[ 0 , 360 ] Default: 0'] },
        { id: '5-34', title: '5.33: COGGING GENLIK YUZDESI', items: ['[ 0.00 , 10.00 ] Default: 0.00 %'] },
        { id: '5-35', title: '5.34: BASLANGIC TAKVIYESI (BOOST)', items: ['[ 0 , 60 ] Default: 30 %'] }
      ]
    },
    {
      id: '6',
      title: '6: PID AYARLARI',
      subSections: [
        { id: '6-1', title: '6.1: KP SIFIR HIZ', items: ['[ 10 , 9999 ] Default: 700'] },
        { id: '6-2', title: '6.2: KI SIFIR HIZ', items: ['[ 1 , 999 ] Default: 14'] },
        { id: '6-3', title: '6.3: KP TAM HIZ', items: ['[ 10 , 9999 ] Default: 500'] },
        { id: '6-4', title: '6.4: KI TAM HIZ', items: ['[ 1 , 999 ] Default: 10'] },
        { id: '6-5', title: '6.5: KALKIS TUTMA FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '6-6', title: '6.6: KP KALKIS TUTMA', items: ['[ 10 , 9999 ] Default: 60'] },
        { id: '6-7', title: '6.7: KD KALKIS TUTMA', items: ['[ 10 , 9999 ] Default: 30'] },
        { id: '6-8', title: '6.8: KP AKIM KAZANCI', items: ['[ 1 , 99999 ] Default: 1000'] },
        { id: '6-9', title: '6.9: KI AKIM KAZANCI', items: ['[ 1 , 99999 ] Default: 100'] },
        { id: '6-10', title: '6.10: ON TORK FONKSIYONU', items: ['- KAPALI  (Default)', '- YUK SENSORU ILE', '- AKILLI TORK TAHMINI'] }
      ]
    },
    {
      id: '7',
      title: '7: KAPI AYARLARI',
      subSections: [
        { id: '7-1', title: '7.1A: KAPI TIPI', items: ['- TAM OTOMATIK  (Default)', '- YARIM OTOMATIK', '- MANUEL', '- KATA GORE FARKLI TIPLER'] },
        { id: '7-2', title: '7.2: MANUEL K. DURUMU KONTROL GECIKMESI', items: ['[ 3 , 60 ] Default: 10 Saniye'] },
        { id: '7-3', title: '7.3: MANUEL KAPI ACIK SESLI UYARI SURESI', items: ['[ 1 , 600 ] Default: 15 Saniye'] },
        { id: '7-4', title: '7.4: REVIZYON ALARMI ILE MANUEL K.UYARISI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '7-5', title: '7.5: DURAKTA BEKLEME SURESI', items: ['[ 3 , 90 ] Default: 5 Saniye'] },
        { id: '7-6', title: '7.6: FOTOSELDEN SONRA BEKLEME SURESI', items: ['[ 1 , 90 ] Default: 3 Saniye'] },
        { id: '7-7', title: '7.7: KAPI ACIK HATASI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '7-8', title: '7.8: KAT KAPISI ZAMAN ASIMI', items: ['[ 10 , 240 ] Default: 60 Saniye'] },
        { id: '7-9', title: '7.9: KAPANAMAYAN KAPI DENEME GECIKMESI', items: ['[ 3 , 200 ] Default: 20 Saniye'] },
        { id: '7-10', title: '7.10: KATTA BEKLERKEN OTOMATIK KAPI', items: ['- KAPALI BEKLER  (Default)', '- ACIK BEKLER'] },
        { id: '7-11', title: '7.11: FOTOSEL ZAMAN ASIMI', items: ['[ 0 , 600 ] Default: 0 Saniye'] },
        { id: '7-12', title: '7.12: LIR BIRAKMA GECIKMESI', items: ['[ 0.00 , 30.00 ] Default: 0.00 Saniye'] },
        { id: '7-13', title: '7.13: LIR DENEME SAYISI', items: ['[ 2 , 20 ] Default: 5'] },
        { id: '7-14', title: '7.20: KAPI KOPRULEME DEVRESI', items: ['- YOK  (Default)', '- VAR'] },
        { id: '7-15', title: '7.21: KAPI ERKEN ACMA', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '7-16', title: '7.22: SEVIYE YENILEME FONKSIYONU', items: ['- YOK  (Default)', '- 141-142 ILE', '- LIFTSENSE ILE'] },
        { id: '7-17', title: '7.23: SEVIYE YENILEME BASLAMA MESAFESI', items: ['- 15.0 mm', '- 22.5 mm  (Default)', '- 30.0 mm', '- 37.5 mm', '- 45.0 mm'] },
        { id: '7-18', title: '7.24: KAPI LIMIT SVICLERI', items: ['- KULLANILMIYOR  (Default)', '- KAPI ACIK VE KAPALI LIMITLERI BAGLI'] },
        { id: '7-19', title: '7.25: KAPI KONTAKLARI KOPRU KONTROLU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '7-20', title: '7.26: KAPI BY-PASS SOKETI', items: ['- YOK  (Default)', '- VAR'] },
        { id: '7-21', title: '7.27: KOPRULU KAPI IZIN VERILEN MAX HIZ', items: ['[ 0.01 , 0.30 ] Default: 0.30 m/s'] },
        { id: '7-22', title: '7.28: KAPI LIMIT SVIC FONKSIYONU', items: ['- SADECE IZLEME ICIN KULLANILIR  (Default)', '- KOMUT SINYALLERINI KESER'] },
        { id: '7-23', title: '7.29: KAPI LIMIT SVIC KONTAKT TIPI', items: ['- (NO) NORMALDE ACIK KONTAK  (Default)', '- (NC) NORMALDE KAPALI KONTAK'] },
        { id: '7-24', title: '7.30: FOTOSEL KONTAK TIPI', items: ['- (NO) NORMALDE ACIK KONTAK  (Default)', '- (NC) NORMALDE KAPALI KONTAK'] },
        { id: '7-25', title: '7.31: LIR CEKME GECIKMESI', items: ['[ 0.00 , 10.00 ] Default: 0.00 Saniye'] },
        { id: '7-26', title: '7.32: UCM ALGILAMA HATA TIPI (EN81-1)', items: ['- KALICI DEGIL', '- KALICI  (Default)'] }
      ]
    },
    {
      id: '8',
      title: '8: KURTARMA AYARLARI',
      subSections: [
        { id: '8-1', title: '8.1: KURTARMA TIPI', items: ['- YOK  (Default)', '- AKTIF SUREREK'] },
        { id: '8-2', title: '8.2: YEDEK GUC KAYNAGI GERILIMI', items: ['- 60V DC', '- 220V AC  (Default)'] },
        { id: '8-3', title: '8.3: YEDEK GUC KAYNAGI SINIRI', items: ['[ 0.10 , 20.00 ] Default: 2.00 KW'] },
        { id: '8-4', title: '8.4: KURTARMA HIZI', items: ['[ 0.10 , 0.50 ] Default: 0.30 m/s'] },
        { id: '8-5', title: '8.5: KURTARMA BASLAMA GECIKMESI', items: ['[ 2 , 60 ] Default: 2 Saniye'] },
        { id: '8-6', title: '8.6: KURTARMA DURMA GECIKMESI', items: ['[ 0.00 , 5.00 ] Default: 0.00 Saniye'] },
        { id: '8-7', title: '8.7: KURTARMA SONRASI KAPININ DURUMU', items: ['- KAPALI BEKLER  (Default)', '- ACIK BEKLER'] },
        { id: '8-8', title: '8.8: UPS TEST FONKSIYONU', items: ['- YOK  (Default)', '- VAR'] },
        { id: '8-9', title: '8.9: UPS TEST SAATI', items: ['00:00'] },
        { id: '8-10', title: '8.10A: PAZARTESI', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-11', title: '8.10B: SALI', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-12', title: '8.10C: CARSAMBA', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-13', title: '8.10D: PERSEMBE', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-14', title: '8.10E: CUMA', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-15', title: '8.10F: CUMARTESI', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-16', title: '8.10G: PAZAR', items: ['- BUGUN UPS TEST ETME  (Default)', '- BUGUN UPS TEST ET'] },
        { id: '8-17', title: '8.11: FAZ ALGILAMA KAYNAGI', items: ['- DAHILI 3-FAZ KONTROL DEVRESI ILE  (Default)', '- RD-1500 ILE', '- FRM GIRISI ILE'] }
      ]
    },
    {
      id: '9',
      title: '9: GOSTERGE AYARLARI',
      subSections: [
        { id: '9-1', title: '9.1: MSP16-EXP GOSTERGE CIKISLARI', items: ['- 7-SEGMENT  (Default)', '- GRAY', '- TERSLENMIS GRAY', '- BINARY', '- TERSLENMIS BINARY'] },
        { id: '9-2', title: '9.2: FX-CUBE GOSTERGE CIKISLARI', items: ['- 7-SEGMENT  (Default)', '- GRAY', '- TERSLENMIS GRAY', '- BINARY', '- TERSLENMIS BINARY'] },
        { id: '9-3', title: '9.3: FX-CUBE 31,32,02 CIKISLARI', items: ['- NORMAL  (Default)', '- TERS'] },
        { id: '9-4', title: '9.4: GRAY/BINARY KOD BASLANGICI', items: ['[ 0 , 1 ] Default: 0'] },
        { id: '9-5', title: '9.5A: DURAK YAZISI AYARLARI', items: ['- KULLANICI TANIMLI  (Default)', '- 0,1,2,3,4,5,...', '- 1,2,3,4,5,6,...', '- -1,0,1,2,3,4,...', '- B,0,1,2,3,4,...', '- P,0,1,2,3,4,...', '- -2,-1,0,1,2,3,...', '- B2,B1,0,1,2,3,...', '- P2,P1,0,1,2,3,...', '- -3,-2,-1,0,1,2,...', '- B3,B2,B1,0,1,2,...', '- P3,P2,P1,0,1,2,...'] },
        { id: '9-6', title: '9.6: SERVIS DISI MESAJI', items: ['"OUT OF SERVICE           "'] },
        { id: '9-7', title: '9.7: ASIRI YUK MESAJI', items: ['"OVERLOADED               "'] },
        { id: '9-8', title: '9.8: BAKIM YAPILIYOR MESAJI', items: ['"UNDER MAINTENANCE        "'] },
        { id: '9-9', title: '9.9: YANGIN GOSTERGESI', items: ['- KAYAR YAZI  (Default)', '- GIRILMEZ SEMBOLU'] },
        { id: '9-10', title: '9.10: YANGIN TAHLIYE MESAJI', items: ['"FIRE!!!                  "'] },
        { id: '9-11', title: '9.11: YEDEK GUCLE TAHLIYE MESAJI', items: ['"EVACUATING...            "'] },
        { id: '9-12', title: '9.12: ACILIS MESAJI', items: ['"PLEASE WAIT...           "'] },
        { id: '9-13', title: '9.13: KAPI ACIK HATA MESAJI', items: ['"DOOR CANNOT CLOSE        "'] },
        { id: '9-14', title: '9.14: BEKLERKEN MESAJ GOSTERIMI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '9-15', title: '9.15: BEKLERKEN GOSTERILECEK MESAJ', items: ['"-----                    "'] },
        { id: '9-16', title: '9.16: OZEL SERVISTE GOSTERILECEK MESAJ', items: ['"SPECIAL SERVICE ONLY     "'] },
        { id: '9-17', title: '9.18: KABIN KATTA GOSTERIMI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '9-18', title: '9.19: KABIN KATTA MESAJI', items: ['"CAR HERE                 "'] },
        { id: '9-19', title: '9.20: MANUEL KAPI ACIK GOSTERIMI', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '9-20', title: '9.21: KABIN KASETINDE TOPLAMA OKU GOSTER', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '9-21', title: '9.22: SIGARA ICILMEZ GOSTERIMI', items: ['- KAPALI', '- ACIK  (Default)'] },
        { id: '9-22', title: '9.23: BC-LCD10555 ARKA PLAN RENK AYARI', items: ['- KULLANICI TANIMLI', '- KIRMIZI', '- YESIL', '- MAVI', '- BEYAZ  (Default)', '- SARI', '- TURUNCU', '- TURKUAZ', '- MOR', '- DEGISEN RENK'] },
        { id: '9-23', title: '9.24: KIRMIZI BILESEN', items: ['[ 0 , 255 ] Default: 255'] },
        { id: '9-24', title: '9.25: YESIL BILESEN', items: ['[ 0 , 255 ] Default: 255'] },
        { id: '9-25', title: '9.26: MAVI BILESEN', items: ['[ 0 , 255 ] Default: 255'] },
        { id: '9-26', title: '9.27: RENK DEGISIM HIZI', items: ['- COK YAVAS', '- YAVAS', '- NORMAL  (Default)', '- HIZLI', '- COK HIZLI'] },
        { id: '9-27', title: '9.28: YON OKU KAYMA HIZI', items: ['- COK YAVAS', '- YAVAS', '- NORMAL  (Default)', '- HIZLI', '- COK HIZLI'] },
        { id: '9-28', title: '9.29: DURAK YAZISI KAYMA YONU', items: ['- HAREKET YONUNDE  (Default)', '- HAREKETIN TERS YONUNDE'] },
        { id: '9-29', title: '9.30: KARAKTER KAYMA HIZI', items: ['- COK YAVAS', '- YAVAS', '- NORMAL  (Default)', '- HIZLI', '- COK HIZLI'] },
        { id: '9-30', title: '9.31: KARAKTER YAZI TIPI', items: ['- NORMAL  (Default)', '- KALIN'] },
        { id: '9-31', title: '9.32: KAT KASETLERI PI GIRISLERI', items: ['- YOK', '- VAR  (Default)'] },
        { id: '9-32', title: '9.33: KATTA UYARI SINYAL TIPI', items: ['- CIFT SES (DING-DONG)  (Default)', '- YUKARI DING, ASAGI CIFT SES (DING-DONG)', '- ASAGI DING, YUKARI CIFT SES (DING-DONG)', '- YUKARI DING, ASAGI DONG', '- ASAGI DING, YUKARI DONG'] }
      ]
    },
    {
      id: '10',
      title: '10: PROGRAMLANABILIR GIRISLER',
      subSections: [
        { id: '10-1', title: '10.1: LCB PI1', items: ['- <TANIMSIZ>  (Default)', '- (141) ASAGI YON MIKNATIS SINYALI', '- (142) YUKARI YON MIKNATIS SINYALI', '- (VAT) VATMAN SINYALI', '- (PAN) PANIK BUTONU', '- (DEP) DEPREM SINYALI', '- (FES) YANGIN SINYALI', '- (FES2) YANGIN SINYALI-2', '- (FFK) ITFAIYECI ANAHTARI', '- (ATSM) GOREVLI SERVISI ANAHTARI', '- (SEV) MANUEL ELLE KURTARMA ANAHTARI', '- (BRC) MEKANIK FREN IZLEME', '- (BRC2) MEKANIK FREN-2 IZLEME', '- (CCC) TUM KABIN KAYITLARINI SIL', '- (FSLH) FOTOSEL SAGLIKLI SINYALI', '- (FRM) KURTARMA MODUNA GECIR', '- (TTR) SEYIR SURESI SIFIRLAMA', '- (XER1) DIS HATA GIRISI(HEMEN DURDUR)', '- (XER2) DIS HATA GIRISI(KATTA DURDUR)', '- (SHLB) KUYU AYDIN. AC-KAPA BUTONU', '- (OOS) SERVIS DISINA GECME ANAHTARI', '- (FAB) KAT ERISIM ENGELLEME', '- (CCB) KABIN CAGRISI ENGELLEME', '- (DFS) DURAK YAZILARI IPTAL GIRISI', '- (DBS) BUTON SESLERI VE KATTA UYARI IPTAL', '- (SPR1) KUYU KORUMA ANAHTARI DURAK-1', '- (SPR2) KUYU KORUMA ANAHTARI DURAK-2', '- (SPR3) KUYU KORUMA ANAHTARI DURAK-3', '- (SPR4) KUYU KORUMA ANAHTARI DURAK-4', '- (SPR5) KUYU KORUMA ANAHTARI DURAK-5', '- (SPR6) KUYU KORUMA ANAHTARI DURAK-6', '- (SPR7) KUYU KORUMA ANAHTARI DURAK-7', '- (SPR8) KUYU KORUMA ANAHTARI DURAK-8', '- (SPR9) KUYU KORUMA ANAHTARI DURAK-9', '- (SPR10) KUYU KORUMA ANAHTARI DURAK-10', '- (SPR11) KUYU KORUMA ANAHTARI DURAK-11', '- (SPR12) KUYU KORUMA ANAHTARI DURAK-12', '- (SPR13) KUYU KORUMA ANAHTARI DURAK-13', '- (SPR14) KUYU KORUMA ANAHTARI DURAK-14', '- (SPR15) KUYU KORUMA ANAHTARI DURAK-15', '- (SPR16) KUYU KORUMA ANAHTARI DURAK-16', '- (DCC) TUM KABIN CAGRILARINI ENGELLE', '- (DLC) TUM DIS CAGRILARI ENGELLE', '- (DLC1) DIS CAGRI ENGELLE KAT-1', '- (DLC2) DIS CAGRI ENGELLE KAT-2', '- (DLC3) DIS CAGRI ENGELLE KAT-3', '- (DLC4) DIS CAGRI ENGELLE KAT-4', '- (DLC5) DIS CAGRI ENGELLE KAT-5', '- (DLC6) DIS CAGRI ENGELLE KAT-6', '- (DLC7) DIS CAGRI ENGELLE KAT-7', '- (DLC8) DIS CAGRI ENGELLE KAT-8', '- (DLC9) DIS CAGRI ENGELLE KAT-9', '- (DLC10) DIS CAGRI ENGELLE KAT-10', '- (DLC11) DIS CAGRI ENGELLE KAT-11', '- (DLC12) DIS CAGRI ENGELLE KAT-12', '- (DLC13) DIS CAGRI ENGELLE KAT-13', '- (DLC14) DIS CAGRI ENGELLE KAT-14', '- (DLC15) DIS CAGRI ENGELLE KAT-15', '- (DLC16) DIS CAGRI ENGELLE KAT-16', '- (JPR1) KOPRU-1', '- (JPR2) KOPRU-2', '- (JPR3) KOPRU-3', '- (JPR4) KOPRU-4'] }
      ]
    },
    {
      id: '11',
      title: '11: PROGRAMLANABILIR CIKISLAR',
      subSections: [
        { id: '11-1', title: '11.1: LCB PR1', items: ['- <TANIMSIZ>  (Default)', '- (K5) KAPI ACMA KOMUTU', '- (K3) KAPI KAPATMA KOMUTU', '- (LIR) KAPI KILIT ACMA MAGNETI', '- (MDW) MANUAL KAPI ACIK SESLI UYARI', '- (BYPA) KAPI KOPRULU HAREKET ALARMI', '- (K4) KAPI YAVAS KAPATMA KOMUTU', '- (AFLT) GEREKSIZ ALARMI FILTRELEME', '- (GPTO) GENEL AMACLI ZAMANLAYICI CIKISI', '- (SPRO) KUYUYA GIRIS ALGILANDI', '- (02) SERVIS DISI', '- (KL) KABIN LAMBASI', '- (O804) ASIRI YUK CIKISI', '- (12) MESGUL SINYALI', '- (BPE) YEDEK GUCLE TAHLIYE AKTIF', '- (31) ASAGI HAREKET SINYALI', '- (32) YUKARI HAREKET SINYALI', '- (RDLB) RD-1500 BATARYA DUSUK', '- (CESL) KABIN USTU ACIL DURUM B. DUSUK', '- (UPT) UPS TEST AKTIF', '- (FRA1) YANGIN ASAMA-1 AKTIF', '- (FRA2) YANGIN ASAMA-2 AKTIF', '- (FRA3) YANGIN ASAMA 1 VEYA 2 AKTIF', '- (SLP) UYKU MODU AKTIF', '- (DRZ) KABIN KAPI BOLGESINDE', '- (FLR) KABIN KATTA BEKLIYOR', '- (FLR1) KABIN 1.KATTA BEKLIYOR', '- (FLR2) KABIN 2.KATTA BEKLIYOR', '- (FLR3) KABIN 3.KATTA BEKLIYOR', '- (FLR4) KABIN 4.KATTA BEKLIYOR', '- (FLR5) KABIN 5.KATTA BEKLIYOR', '- (FLR6) KABIN 6.KATTA BEKLIYOR', '- (FLR7) KABIN 7.KATTA BEKLIYOR', '- (FLR8) KABIN 8.KATTA BEKLIYOR', '- (FLR9) KABIN 9.KATTA BEKLIYOR', '- (FLR10) KABIN 10.KATTA BEKLIYOR', '- (FLR11) KABIN 11.KATTA BEKLIYOR', '- (FLR12) KABIN 12.KATTA BEKLIYOR', '- (FLR13) KABIN 13.KATTA BEKLIYOR', '- (FLR14) KABIN 14.KATTA BEKLIYOR', '- (FLR15) KABIN 15.KATTA BEKLIYOR', '- (FLR16) KABIN 16.KATTA BEKLIYOR', '- (JPR1) KOPRU-1', '- (JPR2) KOPRU-2', '- (JPR3) KOPRU-3', '- (JPR4) KOPRU-4'] }
      ]
    },
    {
      id: '12',
      title: '12: FX-CUBE ANONS AYARLARI',
      subSections: [
        { id: '12-1', title: '12.1: ANONS DILI', items: ['- INGILIZCE  (Default)', '- TURKCE', '- ISPANYOLCA', '- FRANSIZCA', '- LEHCE'] },
        { id: '12-2', title: '12.2: ZEMIN ALTI KAT SAYISI', items: ['[ 0 , 3 ] Default: 0'] },
        { id: '12-3', title: '12.3: ZEMIN ALTI KATLARIN TIPI', items: ['- EKSI(-)  (Default)', '- BODRUM', '- OTOPARK'] },
        { id: '12-4', title: '12.4: ZEMIN VE USTU KATLARIN SIRALAMASI', items: ['- 1,2,3,...  (Default)', '- GIRIS KAT,1,2,3,...', '- ZEMIN KAT,1,2,3,...', '- LOBI,1,2,3,...'] },
        { id: '12-5', title: '12.5: HOSGELDINIZ VE GULE GULE ANONSU-1', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '12-6', title: '12.6: ANONS-1 KATI', items: ['[ 1 , 16 ] Default: 1'] },
        { id: '12-7', title: '12.7: HOSGELDINIZ VE GULE GULE ANONSU-2', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '12-8', title: '12.8: ANONS-2 KATI', items: ['[ 1 , 16 ] Default: 2'] }
      ]
    },
    {
      id: '13',
      title: '13: FONKSIYON LISANSLARI',
      subSections: [
        { id: '13-1', title: '13.1: CANBUS PROTOKOL LISANS KODU', items: ['"00000000"'] },
        { id: '13-2', title: '13.2: MODBUS SADECE OKUMA LISANS KODU', items: ['"00000000"'] },
        { id: '13-3', title: '13.3: MODBUS OKUMA / YAZMA LISANS KODU', items: ['"00000000"'] },
        { id: '13-4', title: '13.4: AGIRLIK SENSORU FONK. LISANS KODU', items: ['"00000000"'] }
      ]
    },
    {
      id: '14',
      title: '14: AGIRLIK SENSORU FONKSIYONU AYARLARI',
      subSections: [
        { id: '14-1', title: '14.1: AGIRLIK SENSORU FONKSIYONU', items: ['- KAPALI  (Default)', '- ACIK'] },
        { id: '14-2', title: '14.2: DENGE ZINCIRI', items: ['- YOK  (Default)', '- VAR'] },
        { id: '14-3', title: '14.3: DENGE ZINCIRI DEGERI', items: ['[ 0.00 , 10.00 ] Default: 0.00 kg/m'] },
        { id: '14-4', title: '14.4: TAM YUK SINIRI', items: ['[ 50 , 9999 ] Default: 7000 kg'] },
        { id: '14-5', title: '14.5: ASIRI YUK SINIRI', items: ['[ 50 , 9999 ] Default: 9000 kg'] }
      ]
    }
  ];

  // İNGİLİZCE DATA - VERDİĞİNİZ TERCÜME (kısaltılmış)
 const dataEnglish = [
  {
    id: '1',
    title: '1: QUICK INSTALLATION',
    subSections: [
      {
        id: '1-1', title: 'OPERATION MODE',
        items: ['- INSTALLATION MODE WITHOUT INSPECT. BOX (Default)', '- INSTALLATION MODE WITH INSPECTION BOX', '- NORMAL OPERATION']
      },
      {
        id: '1-2', title: 'MOTOR TYPE',
        items: ['- INDUCTION (Default)', '- SYNCHRONOUS']
      },
      {
        id: '1-3', title: 'MOTOR CONTROL TYPE',
        items: ['- OPEN LOOP (Default)', '- CLOSED LOOP']
      },
      {
        id: '1-4', title: 'NOMINAL CAR SPEED',
        items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
      },
      {
        id: '1-5', title: 'MOTOR RPM',
        items: ['[ 10 , 3000 ] Default: 1400 RPM']
      },
      {
        id: '1-6', title: 'MOTOR FREQUENCY',
        items: ['[ 1.00 , 200.00 ] Default: 50.00 Hz']
      },
      {
        id: '1-7', title: 'MOTOR CURRENT',
        items: ['[ 2.50 , 50.00 ] Default: 10.00 Amper']
      },
      {
        id: '1-8', title: 'MOTOR VOLTAGE',
        items: ['[ 150 , 500 ] Default: 380 VOLT']
      },
      {
        id: '1-9', title: 'ENCODER TYPE',
        items: ['- ENDAT-SIN COS 2048 (Default)', '- SSI GRAY-SINCOS 2048', '- SSI GRAY-SINCOS 1024', '- BISS BINARY SINCOS 2048', '- BISS GRAY SINCOS 2048', '- SINCOS 2048 SINCOS 2048']
      },
      {
        id: '1-10', title: 'MOTOR DIRECTION',
        items: ['- CLOCKWISE (Default)', '- COUNTER CLOCKWISE']
      },
      {
        id: '1-11', title: 'HIGH SPEED [VMAX]',
        items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
      },
      {
        id: '1-12', title: 'SHAFT POSITION SYSTEM',
        items: ['- ML1-ML2 COUNTER (Default)', '- ENCODER']
      },
      {
        id: '1-13', title: 'NUMBER OF FLOORS',
        items: ['[ 2 , 16 ] Default: 16']
      },
      {
        id: '1-14', title: 'START AUTO-TUNE',
        items: ['- NO (Default)', '- YES']
      }
    ]
  },
  {
    id: '2',
    title: '2: BASIC SETTINGS',
    subSections: [
      { id: '2-1', title: '2.1:LISAN/LANGUAGE', items: ['- TURKCE (Default)', '- ENGLISH', '- ITALIANO', '- ESPANOL'] },
      { id: '2-2', title: '2.2:OPERATION MODE', items: ['- INSTALLATION MODE WITHOUT INSPECT. BOX (Default)', '- INSTALLATION MODE WITH INSPECTION BOX', '- NORMAL OPERATION'] },
      { id: '2-3', title: '2.3:NUMBER OF FLOORS', items: ['[ 2 , 16 ] Default: 16'] },
      { id: '2-4', title: '2.4:SHAFT POSITION SYSTEM', items: ['- ML1-ML2 COUNTER (Default)', '- ENCODER'] },
      { id: '2-5', title: '2.6A:LOP WIRING SYSTEM', items: ['- PARALLEL WIRING (Default)', '- SERIAL WIRING'] },
      { id: '2-6', title: '2.6B:COP WIRING SYSTEM', items: ['- PARALLEL WIRING (Default)', '- SERIAL WIRING'] },
      { id: '2-7', title: '2.7:COLLECTION TYPE', items: ['- SINGLE BUTTON SINGLE DIRECTION (Default)', '- SINGLE BUTTON BOTH DIRECTIONS', '- DOUBLE BUTTON', '- NON-COLLECTIVE UNIVERSAL', '- NON-COLLECTIVE UNIV. (UNLIMITED CAR CALL)'] },
      { id: '2-8', title: '2.8:MAXIMUM TRAVEL TIME BETWEEN FLOORS', items: ['[ 5 , 45 ] Default: 45 Seconds'] },
      { id: '2-9', title: '2.9:PIT INSPECTION TERMINAL', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-10', title: '2.10:OSG COIL CONTROL', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-11', title: '2.11:CAR LIGHT OFF DELAY', items: ['[ 0 , 600 ] Default: 10 Seconds'] },
      { id: '2-12', title: '2.12:CAR FAN OFF DELAY', items: ['[ 0 , 600 ] Default: 60 Seconds'] },
      { id: '2-13', title: '2.13:PARKING FUNCTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-14', title: '2.14:PARKING FLOOR', items: ['[ 1 , 16 ] Default: 1'] },
      { id: '2-15', title: '2.15:PARKING TIME', items: ['[ 0 , 600 ] Default: 180 Seconds'] },
      { id: '2-16', title: '2.16A:FIRE EVACUATION FUNCTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-17', title: '2.16B:FIRE SIGNAL TYPE', items: ['- (NO) NORMALLY OPEN CONTACT (Default)', '- (NC) NORMALLY CLOSED CONTACT'] },
      { id: '2-18', title: '2.16C:FIRE SIGNAL STATE', items: ['- NOT PERMANENT (Default)', '- PERMANENT'] },
      { id: '2-19', title: '2.16D:AUDIBLE ALARM IN FIRE EVACUATION', items: ['- DISABLED (Default)', '- ACTIVE IN ONLY INSPECTION MODE', '- ACTIVE IN ONLY RECALL MODE', '- ACTIVE IN INSPECTION OR RECALL MODE', '- UNTIL ARRIVE TO FIRE EVACUATION FLOOR', '- UNTIL DOOR IS CLOSED'] },
      { id: '2-20', title: '2.16E:DOOR STATE AT FIRE EVACUATION FLR.', items: ['- WAIT OPEN (Default)', '- WAIT CLOSED', '- OPEN AND THEN WAIT CLOSED'] },
      { id: '2-21', title: '2.17:FIRE EVACUATION MAIN FLOOR', items: ['[ 1 , 16 ] Default: 1'] },
      { id: '2-22', title: '2.18:FIRE EVACUATION ALTERNATE FLOOR', items: ['[ 1 , 16 ] Default: 2'] },
      { id: '2-23', title: '2.19A:FIREFIGHTER FUNCTION', items: ['- DISABLED (Default)', '- ENABLED (KEY AT LANDING)', '- ENABLED (KEY AT CAR)'] },
      { id: '2-24', title: '2.19B:FIREFIGHTER KEY TYPE', items: ['- (NO) NORMALLY OPEN CONTACT (Default)', '- (NC) NORMALLY CLOSED CONTACT'] },
      { id: '2-25', title: '2.20:ON INSPECTION LIMITS', items: ['- STOPS IMMEDIATELY (Default)', '- STOPS ON NEXT DOORZONE', '- NO LIMITS (ONLY ON RECALL)'] },
      { id: '2-26', title: '2.21:GROUP IDENTITY', items: ['- CONTROLLER-A (Default)', '- CONTROLLER-B'] },
      { id: '2-27', title: '2.22:BOTTOM MISSING FLOORS', items: ['[ 0 , 9 ] Default: 0'] },
      { id: '2-28', title: '2.23:TOP MISSING FLOORS', items: ['[ 0 , 9 ] Default: 0'] },
      { id: '2-29', title: '2.24:PANIC EVACUATION FUNCTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-30', title: '2.25:PANIC EVACUATION FLOOR', items: ['[ 1 , 16 ] Default: 1'] },
      { id: '2-31', title: '2.26:ATTENDANT SERVICE MODE', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-32', title: '2.27:CONDITION TO EXIT INSPECTION MODE', items: ['- TURNING INSPECTION KEY TO NORMAL (Default)', '- TURNING INSP KEY TO NORMAL AND DOOR OPEN'] },
      { id: '2-33', title: '2.28:TIME TO DISCON. FROM GROUP', items: ['[ 5 , 300 ] Default: 30 Seconds'] },
      { id: '2-34', title: '2.29:SERIAL PORT FUNCTION', items: ['- INACTIVE (Default)', '- ARLIFT', '- MODBUS SLAVE (REMOTE MONITORING)'] },
      { id: '2-35', title: '2.29A:SLAVE ADDRESS', items: ['[ 1 , 247 ] Default: 32'] },
      { id: '2-36', title: '2.29B:BAUDRATE', items: ['- 9600 BAUD (Default)', '- 19200 BAUD'] },
      { id: '2-37', title: '2.29C:PARITY', items: ['- NONE (Default)', '- ODD', '- EVEN'] },
      { id: '2-38', title: '2.29D:STOP BITS', items: ['- 1-BIT (Default)', '- 2-BITS'] },
      { id: '2-39', title: '2.29E:MOT-CUBE MENU ACCESS WITH ARLIFT', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-40', title: '2.30:SHAFT ENTRY PROTECTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-41', title: '2.30B:DOOR CONTROL AT CURRENT FLOOR', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-42', title: '2.31:MAINS FREQUENCY', items: ['- 50 Hz (Default)', '- 60 Hz'] },
      { id: '2-43', title: '2.32:PHASE ORDER CONTROL', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-44', title: '2.33:MONO PHASE REDUCED SPEED MODE', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-45', title: '2.34:CANCELLING COP CALL ON SECOND PRESS', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-46', title: '2.35:POSITION RESET AFTER POWER DOWN', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-47', title: '2.36:PASSWORD', items: ['[ 0 , 999999 ] Default: 0'] },
      { id: '2-48', title: '2.37:LCD CONTRAST', items: ['[ 0 , 9 ] Default: 2'] },
      { id: '2-49', title: '2.38:CAR FAN CONTROL', items: ['- BY FAN BUTTON (Default)', '- AUTOMATIC'] },
      { id: '2-50', title: '2.39:MAINTENANCE TIME CONTROL', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-51', title: '2.40:MAINTENANCE TIME', items: ['01/01/2019 00:00'] },
      { id: '2-52', title: '2.41:DIRECTION CHANGE COUNT LIMIT', items: ['[ 0 , 9999999 ] Default: 0'] },
      { id: '2-53', title: '2.42:WHEN SAFETY CHAIN (120) IS OFF', items: ['- RESUME OPERATION WHEN 120 IS BACK ON (Default)', '- BLOCK ELEVATOR', '- BLOCK UNTIL A CAR COMMAND'] },
      { id: '2-54', title: '2.43:GPTO ON TIME', items: ['[ 1 , 9999999 ] Default: 1 Seconds'] },
      { id: '2-55', title: '2.44:GPTO OFF TIME', items: ['[ 1 , 9999999 ] Default: 1 Seconds'] },
      { id: '2-56', title: '2.45:FAKE COP CALL DETECT. BY PHOTOCELL', items: ['- OFF (Default)', '- CANCELS AT THIRD TIME', '- CANCELS AT FOURTH TIME', '- CANCELS AT FIFTH TIME'] },
      { id: '2-57', title: '2.46:EARTHQUAKE DETECT. SIGNAL TYPE', items: ['- (NO) NORMALLY OPEN CONTACT (Default)', '- (NC) NORMALLY CLOSED CONTACT'] },
      { id: '2-58', title: '2.47:DOOR OPEN HOLDING FUNCTION', items: ['- DISABLED (Default)', '- ENABLED (PRESS DOOR OPEN BUTTON 5 SECS.)', '- ENABLED (PRESS DOOR OPEN BUTTON 10 SECS)', '- ENABLED (PRESS DOOR OPEN BUTTON 15 SECS)'] },
      { id: '2-59', title: '2.48:OSG COIL CONTACT TYPE', items: ['- (NO) NORMALLY OPEN CONTACT', '- (NC) NORMALLY CLOSED CONTACT (Default)'] },
      { id: '2-60', title: '2.49A:COP BUTTON PRESS SOUND', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-61', title: '2.49B:COP FLOOR CHIME', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-62', title: '2.49C:LOP BUTTON PRESS SOUND', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-63', title: '2.49D:LOP FLOOR CHIMES', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-64', title: '2.50:PARALLEL WIRING BUTTON INPUT SCAN', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '2-65', title: '2.51:ERROR LIST ACCESS', items: ['- OPEN TO EVERYONE (Default)', '- AUTHORIZED PERSONNEL ONLY'] },
      { id: '2-66', title: '2.52:CLEAR CAR CALLS ON TERMINAL FLOORS', items: ['- NO (Default)', '- YES'] },
      { id: '2-67', title: '2.53:FLOORS TO BE BLOCKED FROM ACCESS', items: ['[ 0 , 65535 ] Default: 0'] },
      { id: '2-68', title: '2.54:CAR CALL BLOCKING', items: ['[ 0 , 65535 ] Default: 0'] },
      { id: '2-69', title: '2.55:CANBUS PROTOCOL', items: ['- PROTOCOL ARKEL (Default)', '- PROTOCOL OEM'] },
      { id: '2-70', title: '2.56:DOOR STATE WHEN OOS IS ACTIVE', items: ['- WAITS WITH DOOR CLOSED (Default)', '- WAITS WITH DOOR OPEN'] },
      { id: '2-71', title: '2.57:SLEEP MODE ENTRY', items: ['- SLEEP MODE IS DISABLED (Default)', '- AS SOON AS THE CAR LIGHT IS OFF', '- 1 MINUTE AFTER THE CAR LIGHT IS OFF', '- 5 MINUTES AFTER THE CAR LIGHT IS OFF'] },
      { id: '2-72', title: '2.58:BUSY SIGNAL OFF-DELAY', items: ['[ 1 , 60 ] Default: 5 Seconds'] },
      { id: '2-73', title: '2.59:BUSY SIGNAL FROM LOP LEDS', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '2-74', title: '2.60:OOS FUNCTION PARKING FLOOR', items: ['[ 1 , 16 ] Default: 1'] }
    ]
  },
  {
    id: '3',
    title: '3: SHAFT SETTINGS',
    subSections: [
      { id: '3-1', title: '3.1:SHAFT LEARNING DONE', items: ['- NO (Default)', '- YES'] },
      { id: '3-2', title: '3.2:DOOR ZONE MAGNET LENGTH', items: ['[ 10.00 , 70.00 ] Default: 30.00 CM'] },
      { id: '3-3', title: '3.3:DISTANCE BETWEEN ML1-ML2 MAGNETS', items: ['[ 5.00 , 10.00 ] Default: 5.00 CM'] },
      { id: '3-4', title: '3.10:817 SIGNAL POSITION', items: ['[ -100.00 , 20000.00 ] Default: 0.00 CM'] },
      { id: '3-5', title: '3.11:818 SIGNAL POSITION', items: ['[ -100.00 , 20000.00 ] Default: 0.00 CM'] }
    ]
  },
  {
    id: '4',
    title: '4: TRAVEL SPEED CURVE SETTINGS',
    subSections: [
      { id: '4-1', title: '4.1:HIGH SPEED [V_MAX]', items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s'] },
      { id: '4-2', title: '4.3:LOW SPEED [V_MIN]', items: ['[ 0.05 , 0.30 ] Default: 0.13 m/s'] },
      { id: '4-3', title: '4.4:INSPECTION SPEED [V_INSP]', items: ['[ 0.10 , 0.63 ] Default: 0.30 m/s'] },
      { id: '4-4', title: '4.5:RECALL SPEED [V_RCL]', items: ['[ 0.10 , 0.30 ] Default: 0.30 m/s'] },
      { id: '4-5', title: '4.6:RELEVEL SPEED [V_RLVL]', items: ['[ 0.01 , 0.10 ] Default: 0.02 m/s'] },
      { id: '4-6', title: '4.7:SLOWING DISTANCE [XSLW]', items: ['[ 10 , 500 ] Default: 150 CM'] },
      { id: '4-7', title: '4.8:STOPING DISTANCE [XSTP]', items: ['[ 1 , 50 ] Default: 7 CM'] },
      { id: '4-8', title: '4.9:COMFORT LEVEL', items: ['- USER DEFINED', '- COMFORT:1 PERFORMANCE:5', '- COMFORT:2 PERFORMANCE:4', '- COMFORT:3 PERFORMANCE:3 (Default)', '- COMFORT:4 PERFORMANCE:2', '- COMFORT:5 PERFORMANCE:1'] },
      { id: '4-9', title: '4.10:ACCELERATION [PA]', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s2'] },
      { id: '4-10', title: '4.11:DECCELERATION [NA]', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s2'] },
      { id: '4-11', title: '4.12:RAMP SOFTEN S1', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] },
      { id: '4-12', title: '4.13:RAMP SOFTEN S2', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] },
      { id: '4-13', title: '4.14:RAMP SOFTEN S3', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] },
      { id: '4-14', title: '4.15:RAMP SOFTEN S4', items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3'] }
    ]
  },
  {
    id: '5',
    title: '5: MOTOR PARAMETERS',
    subSections: [
      { id: '5-1', title: '5.1:MOTOR AUTO-TUNING DONE', items: ['- NO (Default)', '- YES'] },
      { id: '5-2', title: '5.2:MOTOR TYPE', items: ['- INDUCTION (Default)', '- SYNCHRONOUS'] },
      { id: '5-3', title: '5.3:MOTOR CONTROL TYPE', items: ['- OPEN LOOP (Default)', '- CLOSED LOOP'] },
      { id: '5-4', title: '5.4:NOMINAL CAR SPEED', items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s'] },
      { id: '5-5', title: '5.5:MOTOR ENCODER TYPE', items: ['- ENDAT-SIN COS 2048 (Default)', '- SSI GRAY-SINCOS 2048', '- SSI GRAY-SINCOS 1024', '- BISS BINARY SINCOS 2048', '- BISS GRAY SINCOS 2048', '- SINCOS 2048 SINCOS 2048'] },
      { id: '5-6', title: '5.6:ENCODER RESOLUTION', items: ['[ 100 , 9999 ] Default: 1024 PULSE/REV'] },
      { id: '5-7', title: '5.7A:ENCODER DIRECTION', items: ['- CLOCKWISE (Default)', '- COUNTER CLOCKWISE'] },
      { id: '5-8', title: '5.7B:MOTOR DIRECTION', items: ['- CLOCKWISE (Default)', '- COUNTER CLOCKWISE'] },
      { id: '5-9', title: '5.8:ENCODER FILTER', items: ['[ 1 , 4 ] Default: 2'] },
      { id: '5-10', title: '5.9:ENCODER OFFSET ANGLE', items: ['[ 0 , 360 ] Default: 0'] },
      { id: '5-11', title: '5.10:MOTOR VOLTAGE', items: ['[ 150 , 500 ] Default: 380 VOLT'] },
      { id: '5-12', title: '5.11:MOTOR CURRENT', items: ['[ 2.50 , 50.00 ] Default: 10.00 Amper'] },
      { id: '5-13', title: '5.12:MOTOR FREQUENCY', items: ['[ 1.00 , 200.00 ] Default: 50.00 Hz'] },
      { id: '5-14', title: '5.13:ROTOR SLIP FREQENCY', items: ['[ 0.50 , 8.00 ] Default: 2.50 Hz'] },
      { id: '5-15', title: '5.14:MOTOR NO LOAD CURRENT', items: ['[ 20 , 60 ] Default: 40 %'] },
      { id: '5-16', title: '5.15:MOTOR TIME CONSTANT', items: ['[ 50 , 500 ] Default: 250 ms'] },
      { id: '5-17', title: '5.16:MOTOR V/F MIDDLE FREQUENCY', items: ['[ 2.00 , 10.00 ] Default: 5.00 Hz'] },
      { id: '5-18', title: '5.17:MOTOR V/F MIDDLE VOLTAGE', items: ['[ 5 , 100 ] Default: 40 VOLT'] },
      { id: '5-19', title: '5.18:MOTOR V/F MINIMUM FREQUENCY', items: ['[ 0.50 , 10.00 ] Default: 0.50 Hz'] },
      { id: '5-20', title: '5.19:MOTOR V/F MINIMUM VOLTAGE', items: ['[ 5 , 100 ] Default: 10 VOLT'] },
      { id: '5-21', title: '5.20:MOTOR RPM', items: ['[ 10 , 3000 ] Default: 1400 RPM'] },
      { id: '5-22', title: '5.21:MECHANICAL BRAKE OPENING TIME', items: ['[ 0.10 , 5.00 ] Default: 0.70 Seconds'] },
      { id: '5-23', title: '5.22:MECHANICAL BRAKE CLOSING TIME', items: ['[ 0.10 , 5.00 ] Default: 0.80 Seconds'] },
      { id: '5-24', title: '5.23:MECHANICAL BRAKE MONITORING', items: ['- DISABLED (Default)', '- MONITORING WITH ONE INPUT', '- MONITORING WITH TWO INPUTS'] },
      { id: '5-25', title: '5.24:PTC TEMPERATURE MONITORING', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '5-26', title: '5.25:ROTOR SLIP COMPENSATION GAIN', items: ['[ 0 , 400 ] Default: 100 %'] },
      { id: '5-27', title: '5.26:SAFETY GEAR UNJAMMING', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '5-28', title: '5.27:MOTOR ENCODER ANALOG SIGNAL CHECK', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '5-29', title: '5.28:LOW-LOSS SWITCH MODE TEMP. THRESHOLD', items: ['[ 20 , 70 ] Default: 50 Degrees(C)'] },
      { id: '5-30', title: '5.29:MOTOR TEST WITH DC BRAKE ON RECALL', items: ['- DISABLED (Default)', '- ENABLED (AUTO)', '- ENABLED (USER DEFINED)'] },
      { id: '5-31', title: '5.30:DC BRAKING PERCENTAGE', items: ['[ 0 , 100 ] Default: 50 %'] },
      { id: '5-32', title: '5.31:COGGING COMPENSATION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '5-33', title: '5.32:COGGING OFFSET ANGLE', items: ['[ 0 , 360 ] Default: 0'] },
      { id: '5-34', title: '5.33:COGGING AMPLITUDE PERCENTAGE', items: ['[ 0.00 , 10.00 ] Default: 0.00 %'] },
      { id: '5-35', title: '5.34:STARTING BOOST', items: ['[ 0 , 60 ] Default: 30 %'] }
    ]
  },
  {
    id: '6',
    title: '6: PID SETTINGS',
    subSections: [
      { id: '6-1', title: '6.1:KP ZERO SPEED', items: ['[ 10 , 9999 ] Default: 700'] },
      { id: '6-2', title: '6.2:KI ZERO SPEED', items: ['[ 1 , 999 ] Default: 14'] },
      { id: '6-3', title: '6.3:KP MAX SPEED', items: ['[ 10 , 9999 ] Default: 500'] },
      { id: '6-4', title: '6.4:KI MAX SPEED', items: ['[ 1 , 999 ] Default: 10'] },
      { id: '6-5', title: '6.5:ANTI ROLLBACK FUNCTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '6-6', title: '6.6:KP ANTI ROLLBACK', items: ['[ 10 , 9999 ] Default: 60'] },
      { id: '6-7', title: '6.7:KD ANTI ROLLBACK', items: ['[ 10 , 9999 ] Default: 30'] },
      { id: '6-8', title: '6.8:KP CURRENT GAIN', items: ['[ 1 , 99999 ] Default: 1000'] },
      { id: '6-9', title: '6.9:KI CURRENT GAIN', items: ['[ 1 , 99999 ] Default: 100'] },
      { id: '6-10', title: '6.10:PRE-TORQUE FUNCTION', items: ['- DISABLED (Default)', '- WITH ANALOG LOAD CELL', '- SMART TORQUE ESTIMATION'] }
    ]
  },
  {
    id: '7',
    title: '7: DOOR SETTINGS',
    subSections: [
      { id: '7-1', title: '7.1A:DOOR TYPE', items: ['- AUTOMATIC (Default)', '- SEMI-AUTOMATIC', '- MANUAL', '- DIFFERENT TYPES BY FLOOR'] },
      { id: '7-2', title: '7.2:MANUAL DOOR STATE CHECK DELAY', items: ['[ 3 , 60 ] Default: 10 Seconds'] },
      { id: '7-3', title: '7.3:MANUAL DOOR OPEN AUDIBLE WARNING TIME', items: ['[ 1 , 600 ] Default: 15 Seconds'] },
      { id: '7-4', title: '7.4:INSPECTION ALARM WHEN M. DOOR WARNING', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '7-5', title: '7.5:LOADING / UNLOADING TIME', items: ['[ 3 , 90 ] Default: 5 Seconds'] },
      { id: '7-6', title: '7.6:DOOR DELAY TIME AFTER PHOTOCELL', items: ['[ 1 , 90 ] Default: 3 Seconds'] },
      { id: '7-7', title: '7.7:DOOR OPEN ERROR', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '7-8', title: '7.8:LANDING DOOR OPEN TIMEOUT', items: ['[ 10 , 240 ] Default: 60 Seconds'] },
      { id: '7-9', title: '7.9:DELAY BEFORE DOOR CLOSING RETRY', items: ['[ 3 , 200 ] Default: 20 Seconds'] },
      { id: '7-10', title: '7.10:AUTO DOOR STATE WHEN IDLE ON FLOOR', items: ['- WAITS WITH DOOR CLOSED (Default)', '- WAITS WITH DOOR OPEN'] },
      { id: '7-11', title: '7.11:PHOTOCELL TIMEOUT', items: ['[ 0 , 600 ] Default: 0 Seconds'] },
      { id: '7-12', title: '7.12:LIR OFF DELAY', items: ['[ 0.00 , 30.00 ] Default: 0.00 Seconds'] },
      { id: '7-13', title: '7.13:NUMBER OF RETIRING CAM RETRIES', items: ['[ 2 , 20 ] Default: 5'] },
      { id: '7-14', title: '7.20:DOOR BRIDGING CIRCUIT', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '7-15', title: '7.21:DOOR PREOPENING', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '7-16', title: '7.22:RELEVELLING FUNCTION', items: ['- NONE (Default)', '- WITH 141-142 MAGNETS', '- WITH LIFTSENSE'] },
      { id: '7-17', title: '7.23:RELEVELLING START DISTANCE', items: ['- 15.0 mm', '- 22.5 mm (Default)', '- 30.0 mm', '- 37.5 mm', '- 45.0 mm'] },
      { id: '7-18', title: '7.24:DOOR LIMIT SWITCHES', items: ['- NOT USED (Default)', '- DOOR OPEN AND CLOSE LIMITS CONNECTED'] },
      { id: '7-19', title: '7.25:DOOR CONTACTS BRIDGE CONTROL', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '7-20', title: '7.26:DOOR BY-PASSING SOCKET', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '7-21', title: '7.27:BRIDGED DOOR ALLOWED MAX SPEED', items: ['[ 0.01 , 0.30 ] Default: 0.30 m/s'] },
      { id: '7-22', title: '7.28:DOOR LIMIT SWITCH FUNCTION', items: ['- ONLY FOR SENSING (Default)', '- CUTS-OFF COMMAND SIGNAL'] },
      { id: '7-23', title: '7.29:DOOR LIMIT SWITCH CONTACT TYPE', items: ['- (NO) NORMALLY OPEN CONTACT (Default)', '- (NC) NORMALLY CLOSED CONTACT'] },
      { id: '7-24', title: '7.30:PHOTOCELL CONTACT TYPE', items: ['- (NO) NORMALLY OPEN CONTACT (Default)', '- (NC) NORMALLY CLOSED CONTACT'] },
      { id: '7-25', title: '7.31:LIR ON DELAY', items: ['[ 0.00 , 10.00 ] Default: 0.00 Seconds'] },
      { id: '7-26', title: '7.32:UCM DETECTION ERROR TYPE (EN81-1)', items: ['- NOT PERMANENT', '- PERMANENT (Default)'] }
    ]
  },
  {
    id: '8',
    title: '8: RESCUE SETTINGS',
    subSections: [
      { id: '8-1', title: '8.1:RESCUE TYPE', items: ['- NONE (Default)', '- ACTIVE DRIVE'] },
      { id: '8-2', title: '8.2:RESCUE POWER VOLTAGE', items: ['- 60V DC', '- 220V AC (Default)'] },
      { id: '8-3', title: '8.3:RESCUE POWER LIMIT', items: ['[ 0.10 , 20.00 ] Default: 2.00 KW'] },
      { id: '8-4', title: '8.4:RESCUE SPEED', items: ['[ 0.10 , 0.50 ] Default: 0.30 m/s'] },
      { id: '8-5', title: '8.5:RESCUE START DELAY', items: ['[ 2 , 60 ] Default: 2 Seconds'] },
      { id: '8-6', title: '8.6:RESCUE STOP DELAY', items: ['[ 0.00 , 5.00 ] Default: 0.00 Seconds'] },
      { id: '8-7', title: '8.7:DOOR STATE AFTER RESCUE', items: ['- WAITS WITH DOOR CLOSED (Default)', '- WAITS WITH DOOR OPEN'] },
      { id: '8-8', title: '8.8:UPS TEST FUNCTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '8-9', title: '8.9:UPS TEST TIME', items: ['00:00'] },
      { id: '8-10', title: '8.10A:MONDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-11', title: '8.10B:TUESDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-12', title: '8.10C:WEDNESDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-13', title: '8.10D:THURSDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-14', title: '8.10E:FRIDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-15', title: '8.10F:SATURDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-16', title: '8.10G:SUNDAY', items: ['- DO NOT TEST UPS (Default)', '- TEST UPS'] },
      { id: '8-17', title: '8.11:PHASE DETECTION SOURCE', items: ['- WITH INTERNAL 3PHASE CHECK CIRCUIT (Default)', '- WITH RD-1500', '- WITH FRM INPUT'] }
    ]
  },
  {
    id: '9',
    title: '9: DISPLAY SETTINGS',
    subSections: [
      { id: '9-1', title: '9.1:MSP16-EXP DISPLAY OUTPUTS', items: ['- 7-SEGMENT (Default)', '- GRAY', '- INVERTED GRAY', '- BINARY', '- INVERTED BINARY'] },
      { id: '9-2', title: '9.2:FX-CUBE DISPLAY OUTPUTS', items: ['- 7-SEGMENT (Default)', '- GRAY', '- INVERTED GRAY', '- BINARY', '- INVERTED BINARY'] },
      { id: '9-3', title: '9.3:FX-CUBE 31,32,02 OUTPUTS', items: ['- NORMAL (Default)', '- INVERTED'] },
      { id: '9-4', title: '9.4:GRAY/BINARY CODE START', items: ['[ 0 , 1 ] Default: 0'] },
      { id: '9-5', title: '9.5A:FLOOR TEXT SETTINGS', items: ['- USER DEFINED (Default)'] },
      { id: '9-6', title: '9.6:OUT OF SERVICE TEXT', items: ['"OUT OF SERVICE           "'] },
      { id: '9-7', title: '9.7:OVERLOADED TEXT', items: ['"OVERLOADED               "'] },
      { id: '9-8', title: '9.8:MAINTENANCE MODE TEXT', items: ['"UNDER MAINTENANCE        "'] },
      { id: '9-9', title: '9.9:FIRE DISPLAY', items: ['- SLIDING TEXT (Default)', '- NO ENTRY SYMBOL'] },
      { id: '9-10', title: '9.10:FIRE EVACUATION TEXT', items: ['"FIRE!!!                  "'] },
      { id: '9-11', title: '9.11:BACKUP POWER EVACUATION TEXT', items: ['"EVACUATING...            "'] },
      { id: '9-12', title: '9.12:STARTUP TEXT', items: ['"PLEASE WAIT...           "'] },
      { id: '9-13', title: '9.13:DOOR OPEN ERROR TEXT', items: ['"DOOR CANNOT CLOSE        "'] },
      { id: '9-14', title: '9.14:DISPLAY A TEXT WHEN IDLE', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '9-15', title: '9.15:TEXT TO DISPLAY WHEN IDLE', items: ['"-----                    "'] },
      { id: '9-16', title: '9.16:TEXT TO DISPLAY WHEN SPECIAL SERVICE', items: ['"SPECIAL SERVICE ONLY     "'] },
      { id: '9-17', title: '9.18:CAR HERE INDICATION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '9-18', title: '9.19:CAR HERE TEXT', items: ['"CAR HERE                 "'] },
      { id: '9-19', title: '9.20:MANUAL DOOR OPEN INDICATION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '9-20', title: '9.21:NEXT DIRECTION ARROW ON COP', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '9-21', title: '9.22:DISPLAYING OF NO-SMOKING SYMBOL', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '9-22', title: '9.23:BC-LCD10555 BACK COLOR SETTING', items: ['- USER DEFINED', '- RED', '- GREEN', '- BLUE', '- WHITE (Default)', '- YELLOW', '- ORANGE', '- TURQUISE', '- PURPLE', '- CHANGING COLOR'] },
      { id: '9-23', title: '9.24:RED COMPONENT', items: ['[ 0 , 255 ] Default: 255'] },
      { id: '9-24', title: '9.25:GREEN COMPONENT', items: ['[ 0 , 255 ] Default: 255'] },
      { id: '9-25', title: '9.26:BLUE COMPONENT', items: ['[ 0 , 255 ] Default: 255'] },
      { id: '9-26', title: '9.27:COLOR CHANGING SPEED', items: ['- VERY SLOW', '- SLOW', '- NORMAL (Default)', '- FAST', '- VERY FAST'] },
      { id: '9-27', title: '9.28:DIRECTION ARROW SLIDING SPEED', items: ['- VERY SLOW', '- SLOW', '- NORMAL (Default)', '- FAST', '- VERY FAST'] },
      { id: '9-28', title: '9.29:FLOOR TEXT SLIDING DIRECTION', items: ['- MOVEMENT DIRECTION (Default)', '- OPPOSITE OF MOVEMENT DIRECTION'] },
      { id: '9-29', title: '9.30:CHARACTER SLIDING SPEED', items: ['- VERY SLOW', '- SLOW', '- NORMAL (Default)', '- FAST', '- VERY FAST'] },
      { id: '9-30', title: '9.31:CHARACTER FONT TYPE', items: ['- NORMAL (Default)', '- BOLD'] },
      { id: '9-31', title: '9.32:PI INPUTS ON LOP BOARDS', items: ['- DISABLED', '- ENABLED (Default)'] },
      { id: '9-32', title: '9.33:FLOOR CHIME TYPE', items: ['- TWO SOUNDS (DING-DONG) (Default)', '- UP DING, DOWN TWO SOUNDS (DING-DONG)', '- DOWN DING, UP TWO SOUNDS (DING-DONG)', '- UP DING, DOWN DONG', '- DOWN DING, UP DONG'] }
    ]
  },
  {
    id: '10',
    title: '10: PROGRAMMABLE INPUTS',
    subSections: [
      { id: '10-1', title: '10.1:LCB PI1', items: ['- <UNDEFINED> (Default)'] }
    ]
  },
  {
    id: '11',
    title: '11: PROGRAMABLE OUTPUTS',
    subSections: [
      { id: '11-1', title: '11.1:LCB PR1', items: ['- <UNDEFINED> (Default)'] }
    ]
  },
  {
    id: '12',
    title: '12: FX-CUBE VOICE SETTINGS',
    subSections: [
      { id: '12-1', title: '12.1:VOICE LANGUAGE', items: ['- ENGLISH (Default)', '- TURKISH', '- SPANISH', '- FRENCH', '- POLISH'] },
      { id: '12-2', title: '12.2:NUMBER OF FLOORS BELOW GROUND', items: ['[ 0 , 3 ] Default: 0'] },
      { id: '12-3', title: '12.3:TYPE OF FLOORS BELOW GROUND', items: ['- MINUS(-) (Default)', '- BASEMENT', '- AUTOPARK'] },
      { id: '12-4', title: '12.4:ORDER OF GROUND FLOOR AND ABOVE', items: ['- 1,2,3,... (Default)', '- ENTRANCE,1,2,3,...', '- GROUND FLOOR,1,2,3,.', '- LOBBY,1,2,3,...'] },
      { id: '12-5', title: '12.5:WELCOME&GOODBYE ANNOUNCE-1', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '12-6', title: '12.6:ANNOUNCE-1 FLOOR', items: ['[ 1 , 16 ] Default: 1'] },
      { id: '12-7', title: '12.7:WELCOME&GOODBYE ANNOUNCE-2', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '12-8', title: '12.8:ANNOUNCE-2 FLOOR', items: ['[ 1 , 16 ] Default: 2'] }
    ]
  },
  {
    id: '13',
    title: '13: FEATURE LICENCES',
    subSections: [
      { id: '13-1', title: '13.1:CANBUS PROTOCOL LICENCE CODE', items: ['"00000000"'] },
      { id: '13-2', title: '13.2:MODBUS-RTU READ ONLY LICENCE CODE', items: ['"00000000"'] },
      { id: '13-3', title: '13.3:MODBUS-RTU READ WRITE LICENCE CODE', items: ['"00000000"'] },
      { id: '13-4', title: '13.4:LOAD SENSOR FUNC. LICENCE CODE', items: ['"00000000"'] }
    ]
  },
  {
    id: '14',
    title: '14: LOAD SENSOR FUNCTION SETTINGS',
    subSections: [
      { id: '14-1', title: '14:1:LOAD SENSOR FUNCTION', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '14-2', title: '14.2:BALANCE CHAIN', items: ['- DISABLED (Default)', '- ENABLED'] },
      { id: '14-3', title: '14.3:BALANCE CHAIN VALUE', items: ['[ 0.00 , 10.00 ] Default: 0.00 kg/m'] },
      { id: '14-4', title: '14.4:FULL LOAD LIMIT', items: ['[ 50 , 9999 ] Default: 7000 kg'] },
      { id: '14-5', title: '14.5:OVERLOAD LIMIT', items: ['[ 50 , 9999 ] Default: 9000 kg'] }
    ]
  }
];

// fransızca eklentisi
const dataFrench = [
  {
    id: '1',
    title: '1:INSTALLATION RAPIDE',
    subSections: [
      {
        id: '1-1', title: 'MODE FONCTIONNEMENT',
        items: ['-MODE INSTALLATION SANS BOITE INSPECT. (Default)', '-MODE INSTALLATION AVEC BOITE INSPECT.', '-FONCTIONNEMENT NORMAL']
      },
      {
        id: '1-2', title: 'TYPE DE MOTEUR',
        items: ['-INDUCTION (Default)', '-SYNCHRONE']
      },
      {
        id: '1-3', title: 'TYPE CONTROLE MOTEUR',
        items: ['-BOUCLE OUVERTE (Default)', '-BOUCLE FERMEE']
      },
      {
        id: '1-4', title: 'VITESSE NOM. CABINE',
        items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
      },
      {
        id: '1-5', title: 'TR/MIN MOTEUR',
        items: ['[ 10 , 3000 ] Default: 1400 TR/MIN']
      },
      {
        id: '1-6', title: 'FREQUENCE MOTEUR',
        items: ['[ 1.00 , 200.00 ] Default: 50.00 Hz']
      },
      {
        id: '1-7', title: 'COURANT MOTEUR',
        items: ['[ 2.50 , 50.00 ] Default: 10.00 Ampère']
      },
      {
        id: '1-8', title: 'TENSION MOTEUR',
        items: ['[ 150 , 500 ] Default: 380 VOLT']
      },
      {
        id: '1-9', title: 'TYPE D\'ENCODEUR',
        items: ['-ENDAT-SIN COS 2048 (Default)', '-SSI GRAY-SINCOS 2048', '-SSI GRAY-SINCOS 1024', '-BISS BINAIRE SINCOS 2048', '-BISS GRAY SINCOS 2048', '-SINCOS 2048 SINCOS 2048']
      },
      {
        id: '1-10', title: 'DIRECTION DU MOTEUR',
        items: ['-DANS LE SENS HORAIRE (Default)', '-SENS ANTI-HORAIRE']
      },
      {
        id: '1-11', title: 'VIT. ELEVEE [VMAX]',
        items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
      },
      {
        id: '1-12', title: 'SYSTEME POSITION DE GAINE',
        items: ['-COMPTEUR ML1-ML2 (Default)', '-ENCODEUR']
      },
      {
        id: '1-13', title: 'NOMBRE D\'ETAGES',
        items: ['[ 2 , 16 ] Default: 16']
      },
      {
        id: '1-14', title: 'AUTO-REGLAGE START',
        items: ['-NON (Default)', '-OUI']
      }
    ]
  },
  {
    id: '2',
    title: '2:REGLAGES DE BASE',
    subSections: [
      {
        id: '2-1', title: 'LANGUE',
        items: ['-TURKCE (Default)', '-ENGLISH', '-DEUTSCH', '-FRANCAIS']
      },
      {
        id: '2-2', title: 'MODE FONCTION.',
        items: ['-MODE INSTALLATION SANS BOITE INSPECT. (Default)', '-MODE INSTALLATION AVEC BOITE INSPECT.', '-FONCTIONNEMENT NORMAL']
      },
      {
        id: '2-3', title: 'NOMBRE D\'ETAGE',
        items: ['[ 2 , 16 ] Default: 16']
      },
      {
        id: '2-4', title: 'SYSTEME POSITION GAINE',
        items: ['-COMPTEUR ML1-ML2 (Default)', '-ENCODEUR']
      },
      {
        id: '2-6A', title: 'SYSTEME CABLAGE LOP',
        items: ['-CABLAGE EN PARALLELE (Default)', '-CABLAGE EN SERIE']
      },
      {
        id: '2-6B', title: 'SYSTEME CABLAGE COP',
        items: ['-CABLAGE EN PARALLELE (Default)', '-CABLAGE EN SERIE']
      },
      {
        id: '2-7', title: 'TYPE COLLECTION',
        items: ['-BOUTON UNIQUE DIRECTION UNIQUE (Default)', '-BOUTON UNIQUE DOUBLE DIRECTIONS', '-DOUBLE BOUTON', '-NON-COLLECTIF UNIVERSEL', '-NON-COLLECTIVE UNIV. (UNLIMITED CAR CALL)']
      },
      {
        id: '2-8', title: 'TEMPS COURSE MAXIMUM ENTRE ETAGES',
        items: ['[ 5 , 45 ] Default: 45 Secondes']
      },
      {
        id: '2-9', title: 'BOITE INSPECTION CUVETTE',
        items: ['-DESACTIVE (Default)', '-ACTIVE']
      },
      {
        id: '2-10', title: 'CONTROLE BOBINE REGULATEUR VITESSE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-11', title: 'VOYANT CABINE RETARD',
        items: ['[ 0 , 600 ] Default: 10 Secondes']
      },
      {
        id: '2-12', title: 'VENTILATEUR CAB RETARD',
        items: ['[ 0 , 600 ] Default: 60 Secondes']
      },
      {
        id: '2-13', title: 'FONCTION PARKING',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-14', title: 'ETAGE DU PARKING',
        items: ['[ 1 , 16 ] Default: 1']
      },
      {
        id: '2-15', title: 'TEMPS PARKING',
        items: ['[ 0 , 600 ] Default: 180 Secondes']
      },
      {
        id: '2-16A', title: 'FONCTION EVACUATION INCENDIE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-16B', title: 'TYPE SIGNAL INCENDIE',
        items: ['-(NO) CONTACT OUVERT NORMALEMENT (Default)', '-(NC) CONTACT FERME NORMALEMENT']
      },
      {
        id: '2-16C', title: 'ETAT SIGNAL INCENDIE',
        items: ['-NON PERMANENT (Default)', '-PERMANENT']
      },
      {
        id: '2-16D', title: 'AUDIBLE ALARM IN FIRE EVACUATION',
        items: ['-DISABLED (Default)', '-ACTIVE IN ONLY INSPECTION', '-ACTIVE IN ONLY RECALL MODE', '-ACTIVE IN INSPECTION OR RECALL MODE', '-UNTIL ARRIVE TO FIRE EVACUATION FLOOR', '-UNTIL DOOR IS CLOSED']
      },
      {
        id: '2-16E', title: 'DOOR STATE AT FIRE EVACUATION FLR.',
        items: ['-WAIT OPEN (Default)', '-WAIT CLOSED', '-OPEN AND THEN WAIT CLOSED']
      },
      {
        id: '2-17', title: 'EVAC. INCENDIE ETAGE PRINCIPAL',
        items: ['[ 1 , 16 ] Default: 1']
      },
      {
        id: '2-18', title: 'EVAC. INCENDIE ETAGE ALTERNATIF',
        items: ['[ 1 , 16 ] Default: 2']
      },
      {
        id: '2-19A', title: 'FONCTION POMPIER',
        items: ['-DISABLED (Default)', '-ENABLED (KEY AT LANDING)', '-ENABLED (KEY AT CAR)']
      },
      {
        id: '2-19B', title: 'TYPE DE CLE POMPIER',
        items: ['-(NO) CONTACT OUVERT NORMALEMENT (Default)', '-(NC) CONTACT FERME NORMALEMENT']
      },
      {
        id: '2-20', title: 'LIMITES SUR INSPECTION',
        items: ['-S\'ARRETE IMMEDIAT. (Default)', '-ARRET SUR ZONE PORTE SUIVANTE', '-NO LIMITS (ONLY ON RECALL)']
      },
      {
        id: '2-21', title: 'GROUPE IDENTITE',
        items: ['-CONTROLEUR-A (Default)', '-CONTROLEUR-B']
      },
      {
        id: '2-22', title: 'BAS MANQUANT ETAGES',
        items: ['[ 0 , 9 ] Default: 0']
      },
      {
        id: '2-23', title: 'HAUT MANQUANT ETAGES',
        items: ['[ 0 , 9 ] Default: 0']
      },
      {
        id: '2-24', title: 'FONCTION EVACU. PANIQUE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-25', title: 'ETAGE D\'EVACU. PANIQUE',
        items: ['[ 1 , 16 ] Default: 1']
      },
      {
        id: '2-26', title: 'MODE SERVICE AUXILIAIRE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-27', title: 'CONDITION TO EXIT INSPECTION MODE',
        items: ['-TURNING INSPECTION KEY TO NORMAL (Default)', '-TURNING INSP KEY TO NORMAL AND DOOR OPEN']
      },
      {
        id: '2-28', title: 'TIME TO DISCON. FROM GROUP',
        items: ['[ 5 , 300 ] Default: 30 Secondes']
      },
      {
        id: '2-29', title: 'SERIAL PORT FUNCTION',
        items: ['-INACTIVE (Default)', '-ARLIFT', '-MODBUS SLAVE (REMOTE MONITORING)']
      },
      {
        id: '2-29A', title: 'SLAVE ADDRESS',
        items: ['[ 1 , 247 ] Default: 32']
      },
      {
        id: '2-29B', title: 'BAUDRATE',
        items: ['-9600 BAUD (Default)', '-19200 BAUD']
      },
      {
        id: '2-29C', title: 'PARITY',
        items: ['-NONE (Default)', '-ODD', '-EVEN']
      },
      {
        id: '2-29D', title: 'STOP BITS',
        items: ['-1-BIT (Default)', '-2-BITS']
      },
      {
        id: '2-29E', title: 'MOT-CUBE MENU ACCESS WITH ARLIFT',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-30', title: 'PROTECTION ENTREE GAINE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-30B', title: 'DOOR CONTROL AT CURRENT FLOOR',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-31', title: 'FREQ. DU RESEAU',
        items: ['-50 Hz (Default)', '-60 Hz']
      },
      {
        id: '2-32', title: 'CONTROLE ORDE DE PHASE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-33', title: 'MONOPHASE MODE VITESSE REDUITE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-34', title: 'ANNULATION COP APPEL SUR DEUX. COM.',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-35', title: 'POSIT. MISE A ZERO APRES COUPURE',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-36', title: 'MOT DE PASSE',
        items: ['[ 0 , 999999 ] Default: 0']
      },
      {
        id: '2-37', title: 'CONTRASTE LCD',
        items: ['[ 0 , 9 ] Default: 2']
      },
      {
        id: '2-38', title: 'CONTROLE VENTILATION CABINE',
        items: ['-PAR BOUTON VENTILATEUR (Default)', '-AUTOMATIQUE']
      },
      {
        id: '2-39', title: 'TEMPS CONTROLE DU MAINTENANCE',
        items: ['-DESACTIVE (Default)', '-ACTIVE']
      },
      {
        id: '2-40', title: 'TEMPS MAINTENANCE',
        items: ['01/01/2019 00:00']
      },
      {
        id: '2-41', title: 'DIRECTION LIMITE NOMBRE CHANG.',
        items: ['[ 0 , 9999999 ] Default: 0']
      },
      {
        id: '2-42', title: 'LORSQ. SÉCURITE CHAIN(120)EST DESACT',
        items: ['-RESUME OPERATION WHEN 120 IS BACK ON (Default)', '-BLOQUER ASCENSEUR', '-BLOCK UNTIL A CAR COMMAND']
      },
      {
        id: '2-43', title: 'GPTO ON TIME',
        items: ['[ 1 , 9999999 ] Default: 1 Secondes']
      },
      {
        id: '2-44', title: 'GPTO OFF TIME',
        items: ['[ 1 , 9999999 ] Default: 1 Secondes']
      },
      {
        id: '2-45', title: 'FAKE COP CALL DETECT. BY PHOTOCELL',
        items: ['-OFF (Default)', '-CANCELS AT THIRD TIME', '-CANCELS AT FOURTH TIME', '-CANCELS AT FIFTH TIME']
      },
      {
        id: '2-46', title: 'EARTHQUAKE DETECT. SIGNAL TYPE',
        items: ['-(NO) CONTACT OUVERT NORMALEMENT (Default)', '-(NC) CONTACT FERME NORMALEMENT']
      },
      {
        id: '2-47', title: 'DOOR OPEN HOLDING FUNCTION',
        items: ['-DISABLED (Default)', '-ENABLED (PRESS DOOR OPEN BUTTON 5 SECS.)', '-ENABLED (PRESS DOOR OPEN BUTTON 10 SECS)', '-ENABLED (PRESS DOOR OPEN BUTTON 15 SECS)']
      },
      {
        id: '2-48', title: 'OSG COIL CONTACT TYPE',
        items: ['-(NO) CONTACT OUVERT NORMALEMENT', '-(NC) CONTACT FERME NORMALEMENT (Default)']
      },
      {
        id: '2-49A', title: 'COP BUTTON PRESS SOUND',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-49B', title: 'COP FLOOR CHIME',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-49C', title: 'LOP BUTTON PRESS SOUND',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-49D', title: 'LOP FLOOR CHIMES',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-50', title: 'PARALLEL WIRING BUTTON INPUT SCAN',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '2-51', title: 'ERROR LIST ACCESS',
        items: ['-OPEN TO EVERYONE (Default)', '-AUTHORIZED PERSONNEL ONLY']
      },
      {
        id: '2-52', title: 'CLEAR CAR CALLS ON TERMINAL FLOORS',
        items: ['-NON (Default)', '-OUI']
      },
      {
        id: '2-53', title: 'FLOORS TO BE BLOCKED FROM ACCESS',
        items: ['[ 0 , 65535 ] Default: 0']
      },
      {
        id: '2-54', title: 'CAR CALL BLOCKING',
        items: ['[ 0 , 65535 ] Default: 0']
      },
      {
        id: '2-55', title: 'CANBUS PROTOCOL',
        items: ['-PROTOCOL ARKEL (Default)', '-PROTOCOL OEM']
      },
      {
        id: '2-56', title: 'DOOR STATE WHEN OOS IS ACTIVE',
        items: ['-ATTENDRE AVEC PORTE FERMEE (Default)', '-ATTENDRE AVEC PORTE OUVERTE']
      },
      {
        id: '2-57', title: 'SLEEP MODE ENTRY',
        items: ['-SLEEP MODE IS DISABLED (Default)', '-AS SOON AS THE CAR LIGHT IS OFF', '-1 MINUTE AFTER THE CAR LIGHT IS OFF', '-5 MINUTES AFTER THE CAR LIGHT IS OFF']
      },
      {
        id: '2-58', title: 'BUSY SIGNAL OFF-DELAY',
        items: ['[ 1 , 60 ] Default: 5 Secondes']
      },
      {
        id: '2-59', title: 'BUSY SIGNAL FROM LOP LEDS',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '2-60', title: 'OOS FUNCTION PARKING FLOOR',
        items: ['[ 1 , 16 ] Default: 1']
      }
    ]
  },
  {
    id: '3',
    title: '3:REGLAGES DE GAINE',
    subSections: [
      {
        id: '3-1', title: 'APPRENT. GAINE FAIT',
        items: ['-NON (Default)', '-OUI']
      },
      {
        id: '3-2', title: 'LONGUEUR AIMANT PORTE',
        items: ['[ 10.00 , 70.00 ] Default: 30.00 CM']
      },
      {
        id: '3-3', title: 'DISTANCE ENTRE AIMANTS ML1-ML2',
        items: ['[ 5.00 , 10.00 ] Default: 5.00 CM']
      },
      {
        id: '3-10', title: 'POSITION 817 SIGNAL',
        items: ['[ -100.00 , 20000.00 ] Default: 0.00 CM']
      },
      {
        id: '3-11', title: 'POSITION 818 SIGNAL',
        items: ['[ -100.00 , 20000.00 ] Default: 0.00 CM']
      }
    ]
  },
  {
    id: '4',
    title: '4:REGLAGE COURBE VITESSE COURSE',
    subSections: [
      {
        id: '4-1', title: 'VITESSE ELEVEEE [V_MAX]',
        items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
      },
      {
        id: '4-3', title: 'VITESSE LENTE [V_MIN]',
        items: ['[ 0.05 , 0.30 ] Default: 0.13 m/s']
      },
      {
        id: '4-4', title: 'INSPECT. VITESSE [V_INSP]',
        items: ['[ 0.10 , 0.63 ] Default: 0.30 m/s']
      },
      {
        id: '4-5', title: 'VITESSE RAPPEL [V_RCL]',
        items: ['[ 0.10 , 0.30 ] Default: 0.30 m/s']
      },
      {
        id: '4-6', title: 'VITESSE REMISE NIVEAU [V_RLVL]',
        items: ['[ 0.01 , 0.10 ] Default: 0.02 m/s']
      },
      {
        id: '4-7', title: 'DIST. RALENTIS. [XSLW]',
        items: ['[ 10 , 500 ] Default: 150 CM']
      },
      {
        id: '4-8', title: 'DISTANCE D\'ARRET [XSTP]',
        items: ['[ 1 , 50 ] Default: 7 CM']
      },
      {
        id: '4-9', title: 'NIVEAU CONFORT',
        items: ['-UTILISATEUR DEFINI', '-CONFORT:1 PERFORMANCE:5', '-CONFORT:2 PERFORMANCE:4', '-CONFORT:3 PERFORMANCE:3 (Default)', '-CONFORT:4 PERFORMANCE:2', '-CONFORT:5 PERFORMANCE:1']
      },
      {
        id: '4-10', title: 'ACCELERATION [PA]',
        items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s2']
      },
      {
        id: '4-11', title: 'DECCELERATION [NA]',
        items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s2']
      },
      {
        id: '4-12', title: 'RAMPE D\'ADOUCS1',
        items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3']
      },
      {
        id: '4-13', title: 'RAMPE D\'ADOUCS2',
        items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3']
      },
      {
        id: '4-14', title: 'RAMPE D\'ADOUCS3',
        items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3']
      },
      {
        id: '4-15', title: 'RAMPE D\'ADOUCS4',
        items: ['[ 0.01 , 1.00 ] Default: 0.50 m/s3']
      }
    ]
  },
  {
    id: '5',
    title: '5:PARAMETRES MOTEUR',
    subSections: [
      {
        id: '5-1', title: 'MOTEUR AUTO-REGLAGE FAIT',
        items: ['-NON (Default)', '-OUI']
      },
      {
        id: '5-2', title: 'TYPE DE MOTEUR',
        items: ['-INDUCTION (Default)', '-SYNCHRONE']
      },
      {
        id: '5-3', title: 'TYPE CONTROLE MOTEUR',
        items: ['-BOUCLE OUVERTE (Default)', '-BOUCLE FERMEE']
      },
      {
        id: '5-4', title: 'VITESSE NOMINALE CABINE',
        items: ['[ 0.10 , 2.00 ] Default: 1.00 m/s']
      },
      {
        id: '5-5', title: 'TYPE ENCODEUR MOTEUR',
        items: ['-ENDAT-SIN COS 2048 (Default)', '-SSI GRAY-SINCOS 2048', '-SSI GRAY-SINCOS 1024', '-BISS BINAIRE SINCOS 2048', '-BISS GRAY SINCOS 2048', '-SINCOS 2048 SINCOS 2048']
      },
      {
        id: '5-6', title: 'RESOLUTION ENCODEUR',
        items: ['[ 100 , 9999 ] Default: 1024 IMPULSION/REV']
      },
      {
        id: '5-7A', title: 'DIRECTION ENCODEUR',
        items: ['-DANS LE SENS HORAIRE (Default)', '-SENS ANTI-HORAIRE']
      },
      {
        id: '5-7B', title: 'DIRECTION MOTEUR',
        items: ['-DANS LE SENS HORAIRE (Default)', '-SENS ANTI-HORAIRE']
      },
      {
        id: '5-8', title: 'FILTRE ENCODEUR',
        items: ['[ 1 , 4 ] Default: 2']
      },
      {
        id: '5-9', title: 'ANGLE DEVIATION ENCODEUR',
        items: ['[ 0 , 360 ] Default: 0']
      },
      {
        id: '5-10', title: 'TENSION MOTEUR',
        items: ['[ 150 , 500 ] Default: 380 VOLT']
      },
      {
        id: '5-11', title: 'COURANT MOTEUR',
        items: ['[ 2.50 , 50.00 ] Default: 10.00 Ampère']
      },
      {
        id: '5-12', title: 'FREQ. MOTEUR',
        items: ['[ 1.00 , 200.00 ] Default: 50.00 Hz']
      },
      {
        id: '5-13', title: 'FREQ.GLISSEMENT ROTOR',
        items: ['[ 0.50 , 8.00 ] Default: 2.50 Hz']
      },
      {
        id: '5-14', title: 'MOTEUR SANS CHARGE COURANT',
        items: ['[ 20 , 60 ] Default: 40 %']
      },
      {
        id: '5-15', title: 'TEMPS CONSTANT MOTEUR',
        items: ['[ 50 , 500 ] Default: 250 ms']
      },
      {
        id: '5-16', title: 'MOTEUR V/F FREQUENCE MOYENNE',
        items: ['[ 2.00 , 10.00 ] Default: 5.00 Hz']
      },
      {
        id: '5-17', title: 'MOTEUR V/F TENSION MOYENNE',
        items: ['[ 5 , 100 ] Default: 40 VOLT']
      },
      {
        id: '5-18', title: 'MOTEUR V/F FREQUENCE MINIMUM',
        items: ['[ 0.50 , 10.00 ] Default: 0.50 Hz']
      },
      {
        id: '5-19', title: 'MOTEUR V/F TENSION MINIMUM',
        items: ['[ 5 , 100 ] Default: 10 VOLT']
      },
      {
        id: '5-20', title: 'MOTEUR TR/MIN',
        items: ['[ 10 , 3000 ] Default: 1400 TR/MIN']
      },
      {
        id: '5-21', title: 'FREIN MECANIQUE TEMPS OUVERTURE',
        items: ['[ 0.10 , 5.00 ] Default: 0.70 Secondes']
      },
      {
        id: '5-22', title: 'FREIN MECANIQUE TEMPS FERMETURE',
        items: ['[ 0.10 , 5.00 ] Default: 0.80 Secondes']
      },
      {
        id: '5-23', title: 'MECANIQUE FREIN CONTROLE',
        items: ['-DESACTIVE (Default)', '-CONTROLE AVEC UNE ENTREE', '-CONTROLE AVEC DEUX ENTREES']
      },
      {
        id: '5-24', title: 'MONITORING PTC TEMPERATURE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '5-25', title: 'GLISS. ROTOR GAIN COMPENSATION',
        items: ['[ 0 , 400 ] Default: 100 %']
      },
      {
        id: '5-26', title: 'DEBLOCAGE PARACHUTE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '5-27', title: 'ENCODEUR MOTEUR VERIF. SIGNAL ANALOG',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '5-28', title: 'LOW-LOSS SWITCH MODE TEMP. THRESHOLD',
        items: ['[ 20 , 70 ] Default: 50 Degrees(C)']
      },
      {
        id: '5-29', title: 'MOTOR TEST WITH DC BRAKE ON RECALL',
        items: ['-DISABLED (Default)', '-ENABLED (AUTO)', '-ENABLED (USER DEFINED)']
      },
      {
        id: '5-30', title: 'DC BRAKING PERCENTAGE',
        items: ['[ 0 , 100 ] Default: 50 %']
      },
      {
        id: '5-31', title: 'COGGING COMPENSATION',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '5-32', title: 'COGGING OFFSET ANGLE',
        items: ['[ 0 , 360 ] Default: 0']
      },
      {
        id: '5-33', title: 'COGGING AMPLITUDE PERCENTAGE',
        items: ['[ 0.00 , 10.00 ] Default: 0.00 %']
      },
      {
        id: '5-34', title: 'STARTING BOOST',
        items: ['[ 0 , 60 ] Default: 30 %']
      }
    ]
  },
  {
    id: '6',
    title: '6:REGLAGES CUVETTE',
    subSections: [
      {
        id: '6-1', title: 'KP VITESSE NULLE',
        items: ['[ 10 , 9999 ] Default: 700']
      },
      {
        id: '6-2', title: 'KI VITESSE NULLE',
        items: ['[ 1 , 999 ] Default: 14']
      },
      {
        id: '6-3', title: 'KP VITESSE MAX',
        items: ['[ 10 , 9999 ] Default: 500']
      },
      {
        id: '6-4', title: 'KI VITESSE MAX',
        items: ['[ 1 , 999 ] Default: 10']
      },
      {
        id: '6-5', title: 'FONCTION ANTIGLISSAGE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '6-6', title: 'KP ANTIGLISSAGE',
        items: ['[ 10 , 9999 ] Default: 60']
      },
      {
        id: '6-7', title: 'KD ANTIGLISSAGE',
        items: ['[ 10 , 9999 ] Default: 30']
      },
      {
        id: '6-8', title: 'KP GAIN COURANT',
        items: ['[ 1 , 99999 ] Default: 1000']
      },
      {
        id: '6-9', title: 'KI GAIN COURANT',
        items: ['[ 1 , 99999 ] Default: 100']
      },
      {
        id: '6-10', title: 'FONCTION PRE-TORQUE',
        items: ['-DESACTIVE (Default)', '-AVEC ANALOG CELLULE DE CHARGE', '-ESTIMATION SMART TORQUE']
      }
    ]
  },
  {
    id: '7',
    title: '7:REGLAGE PORTE',
    subSections: [
      {
        id: '7-1A', title: 'TYPE DE PORTE',
        items: ['-AUTOMATIQUE (Default)', '-SEMI-AUTOMATIQUE', '-MANUEL', '-DIFFERENT TYPES BY FLOOR']
      },
      {
        id: '7-2', title: 'PORTE MANUELLE RETARD CONTROLE ETAT',
        items: ['[ 3 , 60 ] Default: 10 Secondes']
      },
      {
        id: '7-3', title: 'PORTE MAN.OUVERT TPS ALARME AUDIBLE',
        items: ['[ 1 , 600 ] Default: 15 Secondes']
      },
      {
        id: '7-4', title: 'ALARME D\'INSPECT LORS AVERT.PORTE M.',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '7-5', title: 'TPS CHARGEMENT/ DECHARGEMENT',
        items: ['[ 3 , 90 ] Default: 5 Secondes']
      },
      {
        id: '7-6', title: 'TEMPORISAT.PORTE APRES PHOTOCELLULE',
        items: ['[ 1 , 90 ] Default: 3 Secondes']
      },
      {
        id: '7-7', title: 'ERR PORTE OUVERT',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '7-8', title: 'PORTE PALIERE DELAI ATTENTE OUVERT',
        items: ['[ 10 , 240 ] Default: 60 Secondes']
      },
      {
        id: '7-9', title: 'RETARD AVANT RE-FERMETURE PORTE',
        items: ['[ 3 , 200 ] Default: 20 Secondes']
      },
      {
        id: '7-10', title: 'ETAT PORTE AUTO INACTIF A L\'ETAGE',
        items: ['-ATTENDRE AVEC PORTE FERMEE (Default)', '-ATTENDRE AVEC PORTE OUVERTE']
      },
      {
        id: '7-11', title: 'PHOTOCELLULE DELAI D\'ATTENTE',
        items: ['[ 0 , 600 ] Default: 0 Secondes']
      },
      {
        id: '7-12', title: 'DELAI LIR',
        items: ['[ 0.00 , 30.00 ] Default: 0.00 Secondes']
      },
      {
        id: '7-13', title: 'NOMBRE DE REPRISE CAME RESERVE',
        items: ['[ 2 , 20 ] Default: 5']
      },
      {
        id: '7-20', title: 'PONTAGE CIRCUIT PORTE',
        items: ['-DESACTIVE (Default)', '-ACTIVE']
      },
      {
        id: '7-21', title: 'PREOUVERTURE DE PORTE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '7-22', title: 'FONCTION REMISE A NIVEAU',
        items: ['-AUCUN (Default)', '-AVEC AIMANTS 141-142', '-AVEC LIFTSENSE']
      },
      {
        id: '7-23', title: 'DISTANCE START REMISE A NIVEAU',
        items: ['-15.0 mm', '-22.5 mm (Default)', '-30.0 mm', '-37.5 mm', '-45.0 mm']
      },
      {
        id: '7-24', title: 'INTERRUPTEURS FIN DE COURSE PORTE',
        items: ['-NON UTILISE (Default)', '-LIMITES CONNECTEES PORTE OUVER.ET FERME']
      },
      {
        id: '7-25', title: 'CONTR. PONTAGE CONTACTS DE PORTE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '7-26', title: 'SOQUET DERIVATION PORTE',
        items: ['-DESACTIVE (Default)', '-ACTIVE']
      },
      {
        id: '7-27', title: 'PORTE COMBLEE VITESSE MAX. PERMISE',
        items: ['[ 0.01 , 0.30 ] Default: 0.30 m/s']
      },
      {
        id: '7-28', title: 'DOOR LIMIT SWITCH FUNCTION',
        items: ['-ONLY FOR SENSING (Default)', '-CUTS-OFF COMMAND SIGNAL']
      },
      {
        id: '7-29', title: 'DOOR LIMIT SWITCH CONTACT TYPE',
        items: ['-(NO) CONTACT OUVERT NORMALEMENT (Default)', '-(NC) CONTACT FERME NORMALEMENT']
      },
      {
        id: '7-30', title: 'PHOTOCELL CONTACT TYPE',
        items: ['-(NO) CONTACT OUVERT NORMALEMENT (Default)', '-(NC) CONTACT FERME NORMALEMENT']
      },
      {
        id: '7-31', title: 'LIR ON DELAY',
        items: ['[ 0.00 , 10.00 ] Default: 0.00 Secondes']
      },
      {
        id: '7-32', title: 'UCM DETECTION ERROR TYPE (EN81-1)',
        items: ['-NON PERMANENT', '-PERMANENT (Default)']
      }
    ]
  },
  {
    id: '8',
    title: '8:REGLAGE SAUVETAGE',
    subSections: [
      {
        id: '8-1', title: 'TYPE SAUVETAGE',
        items: ['-AUCUN (Default)', '-ENTRAINEMENT ACTIF']
      },
      {
        id: '8-2', title: 'TENSION PUISS. SAUVETAGE',
        items: ['-60V DC', '-220V AC (Default)']
      },
      {
        id: '8-3', title: 'LIMITE PUISS. SAUVETAGE',
        items: ['[ 0.10 , 20.00 ] Default: 2.00 KW']
      },
      {
        id: '8-4', title: 'VITESSE DE SAUVETAGE',
        items: ['[ 0.10 , 0.50 ] Default: 0.30 m/s']
      },
      {
        id: '8-5', title: 'RETART DE DEBUT SAUVETAGE',
        items: ['[ 2 , 60 ] Default: 2 Secondes']
      },
      {
        id: '8-6', title: 'RETART D\'ARRET DE SAUVETAGE',
        items: ['[ 0.00 , 5.00 ] Default: 0.00 Secondes']
      },
      {
        id: '8-7', title: 'ETAT DE PORTE APRES SAUVETAGE',
        items: ['-ATTENDRE AVEC PORTE FERMEE (Default)', '-ATTENDRE AVEC PORTE OUVERTE']
      },
      {
        id: '8-8', title: 'UPS TEST FUNCTION',
        items: ['-DESACTIVE (Default)', '-ACTIVE']
      },
      {
        id: '8-9', title: 'UPS TEST TIME',
        items: ['00:00']
      },
      {
        id: '8-10A', title: 'MONDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-10B', title: 'TUESDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-10C', title: 'WEDNESDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-10D', title: 'THURSDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-10E', title: 'FRIDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-10F', title: 'SATURDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-10G', title: 'SUNDAY',
        items: ['-DO NOT TEST UPS (Default)', '-TEST UPS']
      },
      {
        id: '8-11', title: 'PHASE DETECTION SOURCE',
        items: ['-WITH INTERNAL 3PHASE CHECK CIRCUIT (Default)', '-WITH RD-1500', '-WITH FRM INPUT']
      }
    ]
  },
  {
    id: '9',
    title: '9:REGLAGE AFFICHEUR',
    subSections: [
      {
        id: '9-1', title: 'SORTIE D\'AFFICH. MSP16-EXP',
        items: ['-7-SEGMENT (Default)', '-GRAY', '-GRAY INVERSE', '-BINARY', '-BINARY INVERSE']
      },
      {
        id: '9-2', title: 'SORTIE FX-CUBE AFFICHEUR',
        items: ['-7-SEGMENT (Default)', '-GRAY', '-GRAY INVERSE', '-BINARY', '-BINARY INVERSE']
      },
      {
        id: '9-3', title: 'SORTIE 31,32,02 FX-CUBE',
        items: ['-NORMAL (Default)', '-INVERSE']
      },
      {
        id: '9-4', title: 'START GRAY/BINARY CODE',
        items: ['[ 0 , 1 ] Default: 0']
      },
      {
        id: '9-5A', title: 'REGLAGE TEXTE ETAGE',
        items: ['-UTILISATEUR DEFINI (Default)']
      },
      {
        id: '9-5B', title: 'ETAGE 1 TEXTE',
        items: ['']
      },
      {
        id: '9-5C', title: 'LANGUE DAFFICH. DOT MATRIX',
        items: ['-TEXTS UTILISATEUR DEFINI (Default)', '-TEXTES D\'ERREUR EN TURC', '-TEXTES D\'ERREUR EN ANGLAIS']
      },
      {
        id: '9-6', title: 'TEXTE HORS SERVICE',
        items: ['"OUT OF SERVICE           "']
      },
      {
        id: '9-7', title: 'TEXTE SURCHARGE',
        items: ['"OVERLOADED               "']
      },
      {
        id: '9-8', title: 'TEXTE MODE MAINTENACE',
        items: ['"UNDER MAINTENANCE        "']
      },
      {
        id: '9-9', title: 'AFFICHEUR INCENDIE',
        items: ['-TEXTE COULISSANT (Default)', '-SYMBOLE ENTREE INTERDITE']
      },
      {
        id: '9-10', title: 'EVACUAT.INCENDI TEXTE',
        items: ['"FIRE!!!                  "']
      },
      {
        id: '9-11', title: 'TEXT EVACUATION ALIM. DE SECOURS',
        items: ['"EVACUATING...            "']
      },
      {
        id: '9-12', title: 'TEXTE DEMARRAGE',
        items: ['"PLEASE WAIT...           "']
      },
      {
        id: '9-13', title: 'TEXTE ERREUR PORTE OUVERTE',
        items: ['"DOOR CANNOT CLOSE        "']
      },
      {
        id: '9-14', title: 'EN INACTIF AFFICHEUR A TEXTE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '9-15', title: 'EN INACTIF TEXTE A AFFICHEUR',
        items: ['"-----                    "']
      },
      {
        id: '9-16', title: 'TEXT TO DISPLAY WHEN SPECIAL SERVICE',
        items: ['"SPECIAL SERVICE ONLY     "']
      },
      {
        id: '9-18', title: 'INDICATION CABINE ICI',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '9-19', title: 'TEXTE CABINE ICI',
        items: ['"CAR HERE                 "']
      },
      {
        id: '9-20', title: 'INDICAT.OUVER. PORTE MANUELLE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '9-21', title: 'FLECHE SUR COP DIRECTION SUIVANTE',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '9-22', title: 'AFFICHAGE DU SYMB. NON-FUMEUR',
        items: ['-DESACTIVE', '-ACTIVEE (Default)']
      },
      {
        id: '9-23', title: 'BC-LCD10555 REGLAGE COULEUR FOND',
        items: ['-UTILISATEUR DEFINI', '-ROUGE', '-VERT', '-BLEU', '-BLANC (Default)', '-JAUNE', '-ORANGE', '-TURQUOISE', '-VIOLET', '-COULEUR CHANGEANTE']
      },
      {
        id: '9-24', title: 'COMPOSANT ROUGE',
        items: ['[ 0 , 255 ] Default: 255']
      },
      {
        id: '9-25', title: 'COMPOSANT VERT',
        items: ['[ 0 , 255 ] Default: 255']
      },
      {
        id: '9-26', title: 'COMPOSANT BLEU',
        items: ['[ 0 , 255 ] Default: 255']
      },
      {
        id: '9-27', title: 'VIT. CHANGEMENT COULEUR',
        items: ['-TRES LENT', '-LENT', '-NORMAL (Default)', '-RAPIDE', '-TRES RAPIDE']
      },
      {
        id: '9-28', title: 'FLECHE DIRECTN VITESSE GLISSEMENT',
        items: ['-TRES LENT', '-LENT', '-NORMAL (Default)', '-RAPIDE', '-TRES RAPIDE']
      },
      {
        id: '9-29', title: 'TEXTE ETAGE DIRECTION GLISSEMENT',
        items: ['-DIRECTION MOUVEMENT (Default)', '-CONTRAIRE A LA DIRECTION MOUVEMENT']
      },
      {
        id: '9-30', title: 'CARACTERE VITESSE GLISSEMENT',
        items: ['-TRES LENT', '-LENT', '-NORMAL (Default)', '-RAPIDE', '-TRES RAPIDE']
      },
      {
        id: '9-31', title: 'TYPE FONTE DE CARACTERE',
        items: ['-NORMAL (Default)', '-GRAS']
      },
      {
        id: '9-32', title: 'ENTREES PI SUR CARTES LOP',
        items: ['-DESACTIVE', '-ACTIVE (Default)']
      },
      {
        id: '9-33', title: 'TYPE CARILLON DE PLANCHER',
        items: ['-DEUX SONS (DING-DONG) (Default)', '-VERS HAUT DING,BAS DEUX SONS(DING-DONG)', '-VERS BAS DING,HAUT DEUXSONS (DING-DONG)', '-VERS HAUT DING, BAS DONG', '-VERS BAS DING, HAUT DONG']
      }
    ]
  },
  {
    id: '10',
    title: '10:ENTREES PROGRAMMABLES',
    subSections: [
      {
        id: '10-1', title: 'LCB PI1',
        items: ['-<NON DEFINI> (Default)', '-(141)SIGNAL AIMANT DIRECTION VERS BAS', '-(142)SIGNAL AIMANT DIRECTION VERS HAUT', '-(VAT)CLE DE FONCTION PRIORITE COP', '-(PAN)BOUTON PANIQUE', '-(DEP)SIGNAL DETECT. SEISME', '-(FES)SIGNAL EVACUAT INCENDIE', '-(FES2)SIGNAL2 EVACUA INCENDIE', '-(FFK)CLE DE POMPIER', '-(ATSM)CLE DE RESERVATION', '-(SEV)SWITCH MANUEL D\'EVACUATION', '-(BRC)FREIN CONTROLE MECANIQUE', '-(BRC2)FREIN CONTROLE MECANIQUE-2', '-(CCC)ANNULE TOUTES APPELS CABINE', '-(FSLH)PHOTOCELLULE SIGNAL DE SANTE', '-(FRM)FORCE AU MODE DE SAUVETAGE', '-(TTR) RESET MAXIMUM TRAVEL TIMER', '-(XER1) EXTERNAL ERR INPUT (STOP AT ONCE)', '-(XER2) EXTERNAL ERR INPUT(STOP ON FLOOR)', '-(SHLB) SHAFT LIGHT. TOGGLE BUTTON', '-(OOS) OUT OF SERVICE KEY', '-(FAB) FLOOR ACCESS BLOCKING', '-(CCB) CAR CALL BLOCKING', '-(DFS) DISABLE FLOOR SIGNS', '-(DBS) DISABLE BUTTON SOUNDS & FLOOR CHIME', '-(SPR1)PROTEC. ENTREE GAINE ETAGE - 1', '-(SPR2)PROTEC. ENTREE GAINE ETAGE - 2', '-(SPR3)PROTEC. ENTREE GAINE ETAGE - 3', '-(SPR4)PROTEC. ENTREE GAINE ETAGE - 4', '-(SPR5)PROTEC. ENTREE GAINE ETAGE - 5', '-(SPR6)PROTEC. ENTREE GAINE ETAGE - 6', '-(SPR7)PROTEC. ENTREE GAINE ETAGE - 7', '-(SPR8)PROTEC. ENTREE GAINE ETAGE - 8', '-(SPR9)PROTEC. ENTREE GAINE ETAGE - 9', '-(SPR10)PROTEC.ENTREE GAINE ETAGE - 10', '-(SPR11)PROTEC.ENTREE GAINE ETAGE - 11', '-(SPR12)PROTEC.ENTREE GAINE ETAGE - 12', '-(SPR13)PROTEC.ENTREE GAINE ETAGE - 13', '-(SPR14)PROTEC.ENTREE GAINE ETAGE - 14', '-(SPR15)PROTEC.ENTREE GAINE ETAGE - 15', '-(SPR16)PROTEC.ENTREE GAINE ETAGE - 16', '-(DCC) DISABLE ALL CAR CALLS', '-(DLC) DISABLE ALL LOP CALLS', '-(DLC1) DISABLE LOP CALL FLOOR-1', '-(DLC2) DISABLE LOP CALL FLOOR-2', '-(DLC3) DISABLE LOP CALL FLOOR-3', '-(DLC4) DISABLE LOP CALL FLOOR-4', '-(DLC5) DISABLE LOP CALL FLOOR-5', '-(DLC6) DISABLE LOP CALL FLOOR-6', '-(DLC7) DISABLE LOP CALL FLOOR-7', '-(DLC8) DISABLE LOP CALL FLOOR-8', '-(DLC9) DISABLE LOP CALL FLOOR-9', '-(DLC10) DISABLE LOP CALL FLOOR-10', '-(DLC11) DISABLE LOP CALL FLOOR-11', '-(DLC12) DISABLE LOP CALL FLOOR-12', '-(DLC13) DISABLE LOP CALL FLOOR-13', '-(DLC14) DISABLE LOP CALL FLOOR-14', '-(DLC15) DISABLE LOP CALL FLOOR-15', '-(DLC16) DISABLE LOP CALL FLOOR-16', '-(JPR1) VIRTUAL JUMPER-1', '-(JPR2) VIRTUAL JUMPER-2', '-(JPR3) VIRTUAL JUMPER-3', '-(JPR4) VIRTUAL JUMPER-4']
      },
      {
        id: '10-1', title: 'LCB PI2',
        items: ['']
      },
      {
        id: '10-2', title: 'FX-CUBE PI1',
        items: ['']
      },
      {
        id: '10-2', title: 'FX-CUBE PI2',
        items: ['']
      },
      {
        id: '10-2', title: 'FX-CUBE PI3',
        items: ['']
      },
      {
        id: '10-3', title: 'LCB PD1',
        items: ['']
      }
    ]
  },
  {
    id: '11',
    title: '11:SORTIES PROGRAMMABLES',
    subSections: [
      {
        id: '11-1', title: 'LCB PR1',
        items: ['-<NON DEFINI> (Default)', '-(K5)COMMANDE PORTE OUVERTE', '-(K3)COMMANDE PORTE FERMEE', '-(LIR)CAME MOBILE', '-(MDW)SIGNAL SONORE AUDIBLE PORTE MANUEL', '-(BYPA)PORTE IGNOREE ALARME DE TRAJET', '-(K4)PORTE POUSSEE COMMANDE FERMEE', '-(AFLT)FILTRE ALARMES INUTILES', '-(GPTO) GENERAL PURPOSE TIMER OUTPUT', '-(SPRO) DETECTED ENTRY INSIDE SHAFT', '-(02) OUT OF SERVICE', '-(KL) CAR LIGHT', '-(O804) OVERLOAD OUTPUT', '-(12) BUSY SIGNAL', '-(BPE) BACKUP POWER EVACUATION ACTIVE', '-(31) DOWN TRAVEL SIGNAL', '-(32) UP TRAVEL SIGNAL', '-(RDLB) RD-1500 BATTERY IS LOW', '-(CESL) CARTOP EMERG. SUPPLY IS LOW', '-(UPT) UPS TEST ACTIVE', '-(FRA1) FIRE PHASE-1 ACTIVE', '-(FRA2) FIRE PHASE-2 ACTIVE', '-(FRA3) FIRE PHASE 1 OR 2 ACTIVE', '-(SLP) SLEEP MODE ACTIVE', '-(DRZ) CAR AT ANY DOORZONE', '-(FLR) CAR WAITING AT A FLOOR', '-(FLR1) CAR WAITING AT FLOOR-1', '-(FLR2) CAR WAITING AT FLOOR-2', '-(FLR3) CAR WAITING AT FLOOR-3', '-(FLR4) CAR WAITING AT FLOOR-4', '-(FLR5) CAR WAITING AT FLOOR-5', '-(FLR6) CAR WAITING AT FLOOR-6', '-(FLR7) CAR WAITING AT FLOOR-7', '-(FLR8) CAR WAITING AT FLOOR-8', '-(FLR9) CAR WAITING AT FLOOR-9', '-(FLR10) CAR WAITING AT FLOOR-10', '-(FLR11) CAR WAITING AT FLOOR-11', '-(FLR12) CAR WAITING AT FLOOR-12', '-(FLR13) CAR WAITING AT FLOOR-13', '-(FLR14) CAR WAITING AT FLOOR-14', '-(FLR15) CAR WAITING AT FLOOR-15', '-(FLR16) CAR WAITING AT FLOOR-16', '-(JPR1) VIRTUAL JUMPER-1', '-(JPR2) VIRTUAL JUMPER-2', '-(JPR3) VIRTUAL JUMPER-3', '-(JPR4) VIRTUAL JUMPER-4']
      },
      {
        id: '11-2', title: 'FX-CUBE PR1',
        items: ['']
      }
    ]
  },
  {
    id: '12',
    title: '12:FX-CUBE REGLAGE DES VOIX',
    subSections: [
      {
        id: '12-1', title: 'LANGUE DE VOIX',
        items: ['-ANGLAIS (Default)', '-TURQUE', '-SPANISH', '-FRENCH', '-POLISH']
      },
      {
        id: '12-2', title: 'NOMBRE D\'ETAGES AU DESSOUS DU SOL',
        items: ['[ 0 , 3 ] Default: 0']
      },
      {
        id: '12-3', title: 'TYPE D\'ETAGE AU DESSOUS DU SOL',
        items: ['-MOINS (-) (Default)', '-SOUS-SOL', '-PARKING']
      },
      {
        id: '12-4', title: 'ORDRE ETAGES RDC & PLUS',
        items: ['-1,2,3,... (Default)', '-ENTREE,1,2,3,...', '-RDC,1,2,3,.', '-HALL ENTREE,1,2,3,.']
      },
      {
        id: '12-5', title: 'BIENVENUE & AU REVOIR ANNONCE-1',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '12-6', title: 'ETAGE ANNONCE-1',
        items: ['[ 1 , 16 ] Default: 1']
      },
      {
        id: '12-7', title: 'BIENVENUE & AU REVOIR ANNONCE-2',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '12-8', title: 'ETAGE ANNONCE-2',
        items: ['[ 1 , 16 ] Default: 2']
      }
    ]
  },
  {
    id: '13',
    title: '13:FEATURE LICENCES',
    subSections: [
      {
        id: '13-1', title: 'CANBUS PROTOCOL LICENCE CODE',
        items: ['"00000000"']
      },
      {
        id: '13-2', title: 'MODBUS-RTU READ ONLY LICENCE CODE',
        items: ['"00000000"']
      },
      {
        id: '13-3', title: 'MODBUS-RTU READ WRITE LICENCE CODE',
        items: ['"00000000"']
      },
      {
        id: '13-4', title: 'LOAD SENSOR FUNC. LICENCE CODE',
        items: ['"00000000"']
      }
    ]
  },
  {
    id: '14',
    title: '14:LOAD SENSOR FUNCTION SETTINGS',
    subSections: [
      {
        id: '14-1', title: 'LOAD SENSOR FUNCTION',
        items: ['-DESACTIVE (Default)', '-ACTIVEE']
      },
      {
        id: '14-2', title: 'BALANCE CHAIN',
        items: ['-DESACTIVE (Default)', '-ACTIVE']
      },
      {
        id: '14-3', title: 'BALANCE CHAIN VALUE',
        items: ['[ 0.00 , 10.00 ] Default: 0.00 kg/m']
      },
      {
        id: '14-4', title: 'FULL LOAD LIMIT',
        items: ['[ 50 , 9999 ] Default: 7000 kg']
      },
      {
        id: '14-5', title: 'OVERLOAD LIMIT',
        items: ['[ 50 , 9999 ] Default: 9000 kg']
      }
    ]
  }
];
  // Dil bazlı data seçimi
  const getDataByLanguage = (language) => {
    switch (language) {
      case 'turkish':
        return dataTurkish;
      case 'english':
        return dataEnglish;
      case 'french':
        return dataFrench;
      default:
        return dataTurkish;
    }
  };

  const currentData = getDataByLanguage(selectedLanguage);

  // Dil değiştirme fonksiyonu
  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setExpandedSections({});
    setExpandedSubSections({});
  };

  // Dil seçici bileşeni
  const LanguageSelector = () => (
    <View style={styles.languageSelector}>
      <TouchableOpacity 
        style={[styles.langButton, selectedLanguage === 'turkish' && styles.activeLangButton]}
        onPress={() => changeLanguage('turkish')}
      >
        <Text style={[styles.langButtonText, selectedLanguage === 'turkish' && styles.activeLangButtonText]}>TR</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.langButton, selectedLanguage === 'english' && styles.activeLangButton]}
        onPress={() => changeLanguage('english')}
      >
        <Text style={[styles.langButtonText, selectedLanguage === 'english' && styles.activeLangButtonText]}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.langButton, selectedLanguage === 'french' && styles.activeLangButton]}
        onPress={() => changeLanguage('french')}
      >
        <Text style={[styles.langButtonText, selectedLanguage === 'french' && styles.activeLangButtonText]}>FR</Text>
      </TouchableOpacity>
    </View>
  );

  // Arayüz metinleri
  const getUIText = (key) => {
    const texts = {
      turkish: {
        back: 'Geri',
        appTitle: 'ARCUBE EDITOR',
        company: '• ARKEL Elektrik Elektronik San.',
        version: '• V1.01',
        openSections: 'Açık bölümler:',
        copied: '✓ kopyalandı'
      },
      english: {
        back: 'Back',
        appTitle: 'ARCUBE EDITOR',
        company: '• ARKEL Electrical Electronics Ind.',
        version: '• V1.01',
        openSections: 'Open sections:',
        copied: '✓ copied'
      },
      french: {
        back: 'Retour',
        appTitle: 'ARCUBE ÉDITEUR',
        company: '• ARKEL Électrique Électronique Ind.',
        version: '• V1.01',
        openSections: 'Sections ouvertes:',
        copied: '✓ copié'
      }
    };
    return texts[selectedLanguage]?.[key] || texts.turkish[key];
  };

  // Ana başlık tıklandığında - diğerlerini kapat
  const toggleMainSection = (sectionId) => {
    setExpandedSections(prev => {
      const newState = {};
      newState[sectionId] = !prev[sectionId];
      return newState;
    });
    setExpandedSubSections({});
  };

  // Alt başlık tıklandığında
  const toggleSubSection = (subSectionId) => {
    setExpandedSubSections(prev => ({
      ...prev,
      [subSectionId]: !prev[subSectionId]
    }));
  };

  // Öğeyi kopyalama
  const handleCopyItem = (item, sectionTitle, subSectionTitle, itemText) => {
    const copyText = `${sectionTitle} > ${subSectionTitle} > ${itemText}`;
    Clipboard.setString(copyText);
    setCopiedItem(item);
    setTimeout(() => {
      setCopiedItem(null);
    }, 1500);
  };

  // Ana başlık render
  const renderMainSection = (section) => (
    <View key={section.id} style={styles.mainSection}>
      <TouchableOpacity 
        style={[
          styles.mainHeader,
          expandedSections[section.id] && styles.activeMainHeader
        ]}
        onPress={() => toggleMainSection(section.id)}
      >
        <Text style={styles.mainHeaderText}>{section.title}</Text>
        <Text style={styles.arrow}>
          {expandedSections[section.id] ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>
      
      {expandedSections[section.id] && (
        <View style={styles.subSectionsContainer}>
          {section.subSections.map((subSection) => (
            <View key={subSection.id} style={styles.subSection}>
              <TouchableOpacity 
                style={[
                  styles.subHeader,
                  expandedSubSections[subSection.id] && styles.activeSubHeader
                ]}
                onPress={() => toggleSubSection(subSection.id)}
              >
                <Text style={styles.subHeaderText}>{subSection.title}</Text>
                <Text style={styles.arrow}>
                  {expandedSubSections[subSection.id] ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>
              
              {expandedSubSections[subSection.id] && (
                <View style={styles.itemsContainer}>
                  {subSection.items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.item,
                        copiedItem === item && styles.copiedItem
                      ]}
                      onLongPress={() => handleCopyItem(item, section.title, subSection.title, item)}
                      delayLongPress={500}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.itemText}>
                        {item}
                        {copiedItem === item && (
                          <Text style={styles.copiedText}> {getUIText('copied')}</Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← {getUIText('back')}</Text>
      </TouchableOpacity>

      {/* Dil Seçici */}
      <LanguageSelector />

      <Text style={styles.title}>{getUIText('appTitle')}</Text>
      <Text style={styles.subtitle}>
        {getUIText('company')}{'\n'}
        {getUIText('version')}
      </Text>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
      >
        {currentData.map(renderMainSection)}
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {getUIText('openSections')} {Object.keys(expandedSections).filter(key => expandedSections[key]).length}
        </Text>
      </View>
    </View>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('flags');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentScreen('settings');
  };

  const handleBackToFlags = () => {
    setCurrentScreen('flags');
    setSelectedLanguage(null);
  };

  return (
    <View style={styles.appContainer}>
      {currentScreen === 'flags' ? (
        <FlagSelectionScreen onLanguageSelect={handleLanguageSelect} />
      ) : (
        <ElevatorSettingsScreen 
          onBack={handleBackToFlags} 
          initialLanguage={selectedLanguage} // BU SATIR EKLENDİ
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  // Dil seçici stilleri
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  langButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#ecf0f1',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    minWidth: 50,
    alignItems: 'center'
  },
  activeLangButton: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9'
  },
  langButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  activeLangButtonText: {
    color: 'white'
  },
  // Bayrak Ekranı Stilleri
  flagContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  flagTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 40
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  flag: {
    fontSize: 40,
    marginRight: 15
  },
  flagText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50'
  },
  // Geri Butonu Stilleri
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  // Ayarlar Ekranı Stilleri
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 15,
    lineHeight: 16
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10
  },
  mainSection: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db'
  },
  activeMainHeader: {
    backgroundColor: '#2980b9',
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c'
  },
  mainHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  subSectionsContainer: {
    backgroundColor: '#fafafa'
  },
  subSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingLeft: 20,
    backgroundColor: '#2c3e50'
  },
  activeSubHeader: {
    backgroundColor: '#34495e',
    borderLeftWidth: 3,
    borderLeftColor: '#e67e22'
  },
  subHeaderText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    flex: 1
  },
  itemsContainer: {
    backgroundColor: 'white'
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  copiedItem: {
    backgroundColor: '#d4edda',
    borderLeftWidth: 3,
    borderLeftColor: '#28a745'
  },
  itemText: {
    fontSize: 13,
    color: '#34495e',
    lineHeight: 18
  },
  copiedText: {
    color: '#155724',
    fontWeight: 'bold',
    fontSize: 12
  },
  arrow: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8
  },
  spacer: {
    height: 20
  },
  footer: {
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderTopWidth: 1,
    borderTopColor: '#bdc3c7'
  },
  footerText: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 12,
    fontWeight: '500'
  }
});