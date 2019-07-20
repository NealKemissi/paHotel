import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceDTO } from 'src/app/models/dto/serviceDTO';

@Component({
    selector: 'adminServiceUpdate',
    templateUrl: './adminServiceUpdate.component.html',
    styleUrls: ['./adminServiceUpdate.component.css']
})
export class adminServiceUpdateComponent {

    /** service */
    service: Service = new Service();
    /***/
    error: string;
    /***/
    loading: boolean = true;
    /***/
    msgUpdate: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private serviceService: ServiceService) { }

    ngOnInit() {
        this.route.queryParams.forEach(params => {
            this.serviceService.getService(params['id']).subscribe(
                data => {
                    this.service = data;
                    this.loading = false;
                    console.log('service :' + this.service.description);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
        })
    }

    onUpdate() {
        if (!this.msgUpdate) {
            this.msgUpdate = true;
            let service: ServiceDTO = new ServiceDTO(this.service.id, this.service.name, this.service.description, this.service.price, this.service.available);
            console.log('new service ici :' + this.service.description);
            this.serviceService.updateService(service).subscribe(data => service = data, error => this.error = error);
            setTimeout(() => {
                //requete http update ...
                this.router.navigate(['/adminServiceHome']);
            }, 2500);
        }
    }

   
}
