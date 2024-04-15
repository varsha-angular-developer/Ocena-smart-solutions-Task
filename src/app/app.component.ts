import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(private fb: FormBuilder){

  }
  userForm=this.fb.group({
    name: ['', Validators.required],
    course: ['', Validators.required]
  });
  title = 'form_Task';

  ngOnInit(): void {
this.submit()

  }

  submit(){
     
    console.log('Form submitted:', this.userForm.value);
}

  generatePDF() {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;
      const pdf = new jsPDF();
      pdf.text(`Name: ${formValues.name}`, 10, 10);
      pdf.text(`Course: ${formValues.course}`, 10, 20);
      pdf.text(`Date of offer: ${new Date().toLocaleDateString()}`, 10, 30);

      if (formValues.course === 'B.tech') {
        pdf.save(`${formValues.name}_Btech.pdf`);
      } else if (formValues.course === 'M.tech') {
        pdf.save(`${formValues.name}_Mtech.pdf`);
      }
    } else {
      alert('Please fill out all the fields.');
    }
  }
}
