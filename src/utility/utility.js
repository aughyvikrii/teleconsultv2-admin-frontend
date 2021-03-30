import React from 'react';
import { Tag } from '../components/tags/tags';

/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text
    .split(' ')
    .slice(0, size)
    .join(' ')}...`;
};

export const format_rupiah = (angka, prefix) =>{
  if(!angka) return;
  let number_string = parseFloat(angka).toString().replace(/[^,\d]/g, '');
  let split   = number_string.split(',')
  let sisa     = split[0].length % 3
  let rupiah     = split[0].substr(0, sisa)
  let ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
  
  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
  let separator = sisa ? '.' : '';
  rupiah += separator + ribuan.join('.');
  }
  
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

export const day_tanslate = (name, lang='id') => {
  if(lang == 'id') {
    switch(name) {
      case 'monday': return 'Senin';
      case 'tuesday': return 'Selasa';
      case 'wednesday': return 'Rabu';
      case 'thursday': return 'Kamis';
      case 'friday': return 'Jumat';
      case 'saturday': return 'Sabtu';
      case 'sunday': return 'Minggu';
      default: return name;
    }
  } else {
    return name;
  }
}

export const label_apstatus = (status) => {
  if(status == 'waiting_consul') {
    return <Tag color="#4347D9">Menunggu Konsultasi</Tag>
  } else if ( status == 'waiting_payment' ) {
    return <Tag color="#ea8519">Menunggu Pembayaran</Tag>
  } else if ( status == 'done' ) {
    return <Tag color="#47bc14">Selesai Konsultasi</Tag>
  } else if ( status == 'payment_cancel' ) {
    return <Tag color="#f50">Pembayaran Dibatalkan</Tag>
  } else return status;
}

export { ellipsis };
