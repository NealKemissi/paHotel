import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
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
  user : User;
  /***/
  error: string;
  /***/
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private bookingService: BookingService, private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.bookingService.getBooking(params['id']).subscribe(
          data => {
              this.booking = data;
              this.loading = false;
              console.log('id booking : ' + this.booking.id);
              this.userService.getUserById(this.booking.id_user).subscribe(
                data => {
                  this.user = data;
                  console.log('user : ' + this.user.firstname);
              },
              error => {
                  this.error = error;
              })

          },
          error => {
              this.error = error;
              this.loading = false;
          })
  })
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
    var infoUser = 'Facture n°' + this.booking.id + '\n\nClient : ' + this.booking.user.firstname.toUpperCase() + ' ' + this.booking.user.lastname + '\nEmail : ' + this.booking.user.email;
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
