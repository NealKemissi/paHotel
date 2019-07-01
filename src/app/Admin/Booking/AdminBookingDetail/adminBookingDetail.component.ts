import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
declare let jsPDF; // on l'import grace au script ajouté dans index.html

@Component({
  selector: 'adminBookingDetail',
  templateUrl: './adminBookingDetail.component.html',
  styleUrls: ['./adminBookingDetail.component.css']
})
export class AdminBookingDetailComponent {

  /** reservation */
  booking: Booking;
  /***/
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getBooking().subscribe(data => this.booking = data, error => this.error = error);
  }

  convertPDF() {
    if (this.booking != undefined) {
      /** methode 1*/
      /*
      const pdfContent : HTMLElement = document.getElementById('test');
      var doc = new jsPDF();

      doc.addHTML(pdfContent, () => {
        doc.save('facture_'+this.booking.id+'.pdf');
      })
      */

      /** methode 2*/
      var doc = new jsPDF();
      doc.text(this.stringBooking(), 8, 8);
      doc.save('facture_' + this.booking.id + '.pdf');

      /** creer une fonction qui retourne toutes les infos avec des balises html, ensuite utiliser la methode 1 et se servir de getElementById pour avoir les bonnes infos */
    }
  }

  stringBooking(): string {
    var infoUser = 'Facture n°' + this.booking.id + '\n\nClient : ' + this.booking.user.firstName.toUpperCase() + ' ' + this.booking.user.lastName + '\nEmail : ' + this.booking.user.email;
    var infoDate = 'Du ' + this.booking.dateBegin + ' au ' + this.booking.dateBegin;
    var infoRooms = 'Chambre(s) louée(s) : \n' + this.stringifyObject(this.booking.rooms, '');
    var infoEvents = 'Evenement(s) participé(s) : \n' + this.stringifyObject(this.booking.events, '');
    return infoUser + '\n\n' + infoDate + '\n\n\n' + infoRooms + '\n\n' + infoEvents;
  }

  stringifyObject(data: Object, str: string): string {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] !== null && typeof data[key] === 'object' && !Array.isArray(data[key])) {
          str = this.stringifyObject(data[key], str);
        }
        str += '\t'+key + ' : ' + data[key] + '\n';
      }
    }
    return str;
  }
}
