import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"> &#9400;<b><a href="https://github.com/Kolezhniuk" target="_blank">D.Kolezhniuk</a></b> 2018</span>
  `,
})
export class FooterComponent {
}
