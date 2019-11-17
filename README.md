# QuadTrees

QuadTrees are a 2D point decomposition algorithm, essentially grouping points into "boxes". Each box has a center point and a radius, both of which define an amount of space the box is responsible for.

It also has a capacity, a maximum amount of points it can hold before it has to split into 4 subdivisions, each of which are a box in and of themselves.

Here is an example of a QuadTree with box capacity 1:
![QuadTree Example](https://en.wikipedia.org/wiki/File:Point_quadtree.svg)

QuadTrees allow fast classification of points and speed up algorithms that require localised point querying, such as object interactions. 

Another use is for image compression, in this case the points are colour values. Each box would contain a threshold for which a colour and deviate and still remain classified inside that box. Anything outside of this deviation would cause it to subdivide.

Here is an example of image compression with QuadTrees:
![Image Compression Example](https://en.wikipedia.org/wiki/File:Quadtree_compression_of_an_image.gif)

There is a 3D version of QuadTrees, called OctTrees that have the same idea but for 3 dimensions.

[Wikipedia article](https://en.wikipedia.org/wiki/Quadtree)
