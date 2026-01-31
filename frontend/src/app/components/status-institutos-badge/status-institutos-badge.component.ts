import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoInstitutoDto } from '../../pages/instituciones/institutos.component';

@Component({
  selector: 'app-status-institutos-badge',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './status-institutos-badge.component.scss',
  template: `
  @if(estado){
    <span class="badge" [ngClass]="'status-' + estado.id" title="{{estado.descripcion}}">
      {{ estado.nombre }}
  </span>
  }
  `
})
export class StatusInstitutosBadgeComponent {
  @Input({ required: true }) estado?: EstadoInstitutoDto;
}
