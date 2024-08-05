import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct | undefined;
    errorMessage: string | undefined;

    constructor(private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            this.getProduct(id);
        }
    }

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            (product: IProduct) => this.product = product,
            (error: any) => this.errorMessage = <any>error
        );
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }
}
