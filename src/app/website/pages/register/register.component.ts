import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExitGuard, OnExit } from 'src/app/guards/exit.guard';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnExit {
  onExit() {
    const rta = confirm('Logica desde comp, estas seguro de salir? ');
    return rta;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
